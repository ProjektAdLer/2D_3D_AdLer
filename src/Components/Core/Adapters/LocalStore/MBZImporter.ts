import { gunzipSync, unzipSync } from "fflate";
import LocalStore from "./LocalStore";

/**
 * Represents the world data structure from ATF/DSL/AWT format
 */
interface WorldDocument {
  $type: string;
  fileVersion?: string;
  author?: string;
  language?: string;
  world: {
    worldName: string;
    worldUUID?: string;
    worldDescription?: string;
    theme?: string;
    spaces: any[];
    elements: LearningElement[];
  };
}

/**
 * Represents a learning element in the world
 */
interface LearningElement {
  $type?: string;
  elementId: number;
  elementName: string;
  elementCategory: string;
  elementFileType: string;
  elementMaxScore?: number;
  elementUUID?: string;
  url?: string;
}

/**
 * Result of MBZ import operation
 */
export interface ImportResult {
  success: boolean;
  worldID: number;
  worldName: string;
  elementCount: number;
  errors: string[];
  warnings: string[];
}

/**
 * Progress callback for import operations
 */
export type ImportProgressCallback = (
  current: number,
  total: number,
  status: string,
) => void;

/**
 * Extracted file from tar.gz
 * Currently not used as interface, but kept for future reference
 */
// interface ExtractedFile {
//   name: string;
//   data: Uint8Array;
// }

/**
 * MBZImporter handles the extraction and storage of MBZ (Moodle Backup) files
 * into IndexedDB for offline use.
 *
 * MBZ files are tar.gz archives (gzip-compressed TAR files), not ZIP files!
 *
 * Process:
 * 1. Decompress gzip layer
 * 2. Parse TAR archive
 * 3. Read ATF_Document.json or DSL_Document.json
 * 4. Extract element files (images, PDFs, H5P archives, etc.)
 * 5. Store all files as blobs in IndexedDB via LocalStore
 * 6. Generate worldID and save metadata
 */
export default class MBZImporter {
  private localStore: LocalStore;
  private warnings: string[] = [];
  private errors: string[] = [];

  constructor(localStore: LocalStore) {
    this.localStore = localStore;
  }

  /**
   * Import an MBZ file into IndexedDB
   * @param file The MBZ file from user selection
   * @param onProgress Optional callback for progress updates
   * @returns Import result with worldID and statistics
   */
  async importMBZ(
    file: File,
    onProgress?: ImportProgressCallback,
  ): Promise<ImportResult> {
    this.warnings = [];
    this.errors = [];

    try {
      // Step 1: Extract MBZ (tar.gz format)
      console.log("[MBZImporter] Loading MBZ file...");
      onProgress?.(0, 100, "Extrahiere MBZ-Datei...");
      const extractedFiles = await this.extractMBZ(file);

      // Step 2: Find and read world document
      console.log("[MBZImporter] Reading world document...");
      onProgress?.(10, 100, "Lese Weltdokument...");
      const worldDoc = this.readWorldDocument(extractedFiles);

      if (!worldDoc) {
        throw new Error(
          "No valid world document found (ATF_Document.json or DSL_Document.json)",
        );
      }

      const worldName = worldDoc.world.worldName;
      console.log(`[MBZImporter] World name: ${worldName}`);

      // Step 3: Generate or determine worldID
      const worldID = await this.generateWorldID(worldName, worldDoc);
      console.log(`[MBZImporter] Assigned worldID: ${worldID}`);

      // Step 4: Build file mapping for DSL format
      onProgress?.(15, 100, "Erstelle Datei-Mapping...");
      const fileMapping = this.buildFileMapping(extractedFiles);

      // Step 5: Save world.json
      onProgress?.(20, 100, "Speichere Weltdaten...");
      await this.saveWorldJson(worldDoc, worldID);

      // Step 6: Process and save all element files
      const totalElements = worldDoc.world.elements.length;
      console.log(`[MBZImporter] Processing ${totalElements} elements...`);
      let successCount = 0;

      for (let i = 0; i < totalElements; i++) {
        const element = worldDoc.world.elements[i];

        // Calculate progress: 20% initial setup, 70% for elements, 10% for finalization
        const progress = 20 + Math.round((i / totalElements) * 70);
        onProgress?.(
          progress,
          100,
          `Verarbeite Element ${i + 1}/${totalElements}: ${element.elementName}`,
        );

        const result = await this.processElement(
          element,
          extractedFiles,
          worldID,
          fileMapping,
        );
        if (result) {
          successCount++;
        }
      }

      console.log(
        `[MBZImporter] Successfully processed ${successCount}/${worldDoc.world.elements.length} elements`,
      );

      // Step 7: Save world metadata
      onProgress?.(95, 100, "Speichere Metadaten...");
      await this.localStore.saveWorldMetadata(worldID, {
        worldName,
        worldFolder: worldName,
        importTimestamp: Date.now(),
        elementCount: successCount,
      });

      onProgress?.(100, 100, "Import abgeschlossen!");
      console.log("[MBZImporter] Import completed successfully");

      return {
        success: true,
        worldID,
        worldName,
        elementCount: successCount,
        errors: this.errors,
        warnings: this.warnings,
      };
    } catch (error) {
      console.error("[MBZImporter] Import failed:", error);
      this.errors.push(
        error instanceof Error ? error.message : "Unknown error",
      );

      return {
        success: false,
        worldID: -1,
        worldName: "",
        elementCount: 0,
        errors: this.errors,
        warnings: this.warnings,
      };
    }
  }

  /**
   * Extract MBZ file (tar.gz format)
   * @param file The MBZ file
   * @returns Map of extracted files
   */
  private async extractMBZ(file: File): Promise<Map<string, Uint8Array>> {
    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Step 1: Decompress gzip
      console.log("[MBZImporter] Decompressing gzip...");
      const decompressed = gunzipSync(uint8Array);

      // Step 2: Parse TAR archive
      console.log("[MBZImporter] Parsing TAR archive...");
      const files = this.parseTar(decompressed);

      console.log(`[MBZImporter] Extracted ${files.size} files from MBZ`);
      return files;
    } catch (error) {
      console.error("[MBZImporter] Failed to extract MBZ:", error);
      throw new Error(
        `Failed to extract MBZ file. Please ensure it is a valid Moodle backup (.mbz) file. Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Parse TAR archive
   * Simple TAR parser for extracting files
   */
  private parseTar(data: Uint8Array): Map<string, Uint8Array> {
    const files = new Map<string, Uint8Array>();
    let offset = 0;

    while (offset < data.length) {
      // TAR header is 512 bytes
      if (offset + 512 > data.length) break;

      // Check if this is an empty block (end of archive)
      let isEmpty = true;
      for (let i = 0; i < 512; i++) {
        if (data[offset + i] !== 0) {
          isEmpty = false;
          break;
        }
      }
      if (isEmpty) break;

      // Read filename (offset 0, length 100)
      const nameBytes = data.slice(offset, offset + 100);
      const nameEnd = nameBytes.indexOf(0);
      const filename = new TextDecoder().decode(
        nameBytes.slice(0, nameEnd > 0 ? nameEnd : 100),
      );

      // Read file size (offset 124, length 12, octal)
      const sizeBytes = data.slice(offset + 124, offset + 136);
      const sizeStr = new TextDecoder()
        .decode(sizeBytes)
        .trim()
        .replace(/\0/g, "");
      const fileSize = parseInt(sizeStr, 8) || 0;

      // Skip header
      offset += 512;

      // Read file data if size > 0 and not a directory
      if (fileSize > 0 && !filename.endsWith("/")) {
        const fileData = data.slice(offset, offset + fileSize);
        files.set(filename, fileData);
      }

      // Move to next file (TAR blocks are 512-byte aligned)
      offset += Math.ceil(fileSize / 512) * 512;
    }

    return files;
  }

  /**
   * Read ATF_Document.json or DSL_Document.json from extracted files
   */
  private readWorldDocument(
    files: Map<string, Uint8Array>,
  ): WorldDocument | null {
    // Try ATF format first
    const atfData = files.get("ATF_Document.json");
    if (atfData) {
      const content = new TextDecoder().decode(atfData);
      const worldDoc = JSON.parse(content) as WorldDocument;

      // Convert to AWT format for consistency
      if (worldDoc.$type === "ATF") {
        worldDoc.$type = "AWT";
      }

      return worldDoc;
    }

    // Try DSL format
    const dslData = files.get("DSL_Document.json");
    if (dslData) {
      const content = new TextDecoder().decode(dslData);
      const worldDoc = JSON.parse(content) as WorldDocument;

      // Convert to AWT format for consistency
      if (worldDoc.$type === "DSL") {
        worldDoc.$type = "AWT";
      }

      return worldDoc;
    }

    // Try already extracted world.json
    const worldData = files.get("world.json");
    if (worldData) {
      const content = new TextDecoder().decode(worldData);
      return JSON.parse(content) as WorldDocument;
    }

    return null;
  }

  /**
   * Generate a unique worldID based on world name and existing worlds
   * Uses a hash-based approach to ensure consistency across imports
   */
  private async generateWorldID(
    worldName: string,
    worldDoc: WorldDocument,
  ): Promise<number> {
    // Use UUID if available for consistent ID generation
    if (worldDoc.world.worldUUID) {
      // Convert UUID to numeric ID (simple hash)
      const hash = this.hashString(worldDoc.world.worldUUID);
      return Math.abs(hash) % 1000000; // Keep it reasonable
    }

    // Fallback: Use world name hash
    const hash = this.hashString(worldName);
    return Math.abs(hash) % 1000000;
  }

  /**
   * Simple string hash function
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  /**
   * Build file mapping from files.xml (DSL format only)
   */
  private buildFileMapping(
    files: Map<string, Uint8Array>,
  ): Map<string, string> | null {
    const filesXmlData = files.get("files.xml");
    if (!filesXmlData) {
      return null; // ATF format doesn't have files.xml
    }

    try {
      const xmlContent = new TextDecoder().decode(filesXmlData);

      // Parse XML to extract elementUUID -> contenthash mapping
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

      const mapping = new Map<string, string>();

      const fileElements = xmlDoc.querySelectorAll("file");
      fileElements.forEach((fileEl) => {
        const elementUUID = fileEl.querySelector("elementUUID")?.textContent;
        const contenthash = fileEl.querySelector("contenthash")?.textContent;

        if (elementUUID && contenthash) {
          // File path in TAR: files/XX/XXXX... (XX = first 2 chars of hash)
          const hashPrefix = contenthash.substring(0, 2);
          const filePath = `files/${hashPrefix}/${contenthash}`;
          mapping.set(elementUUID, filePath);
        }
      });

      console.log(
        `[MBZImporter] Built file mapping with ${mapping.size} entries`,
      );
      return mapping;
    } catch (error) {
      console.warn("[MBZImporter] Failed to parse files.xml:", error);
      this.warnings.push("Could not parse files.xml - using ATF fallback");
      return null;
    }
  }

  /**
   * Save world.json to IndexedDB
   */
  private async saveWorldJson(
    worldDoc: WorldDocument,
    worldID: number,
  ): Promise<void> {
    const worldJsonContent = JSON.stringify(worldDoc, null, 2);
    const blob = new Blob([worldJsonContent], { type: "application/json" });

    await this.localStore.saveFile(worldID, "world.json", blob);
    console.log("[MBZImporter] Saved world.json");
  }

  /**
   * Process a single learning element
   */
  private async processElement(
    element: LearningElement,
    files: Map<string, Uint8Array>,
    worldID: number,
    fileMapping: Map<string, string> | null,
  ): Promise<boolean> {
    const {
      elementId,
      elementName,
      elementFileType,
      elementCategory,
      elementUUID,
      url,
    } = element;

    // Skip external URLs
    if (url && url.startsWith("http")) {
      console.log(
        `[MBZImporter] Element ${elementId}: External URL - skipping`,
      );
      return true;
    }

    // Skip adaptivity elements (embedded in world.json)
    if (elementCategory === "adaptivity" || elementFileType === "adaptivity") {
      console.log(
        `[MBZImporter] Element ${elementId}: Adaptivity (embedded) - skipping`,
      );
      return true;
    }

    // Find source file in extracted files
    let sourceData: Uint8Array | undefined;

    // DSL format: Use file mapping
    if (fileMapping && elementUUID) {
      const filePath = fileMapping.get(elementUUID);
      if (filePath) {
        sourceData = files.get(filePath);
      }
    }

    // ATF format or fallback: Search by filename (case-insensitive)
    if (!sourceData) {
      const fileName = `${elementName}.${elementFileType}`;
      const foundEntry = this.findFileInExtracted(files, fileName);
      if (foundEntry) {
        sourceData = foundEntry.data;
      }
    }

    if (!sourceData) {
      const msg = `Element ${elementId} (${elementName}.${elementFileType}): File not found`;
      console.warn(`[MBZImporter] ${msg}`);
      this.warnings.push(msg);
      return false;
    }

    // Handle H5P elements (nested ZIP archives)
    if (
      elementCategory === "h5p" ||
      elementCategory === "primitiveH5P" ||
      elementFileType === "h5p"
    ) {
      return await this.processH5PElement(element, sourceData, worldID);
    }

    // Handle regular files
    try {
      const blob = new Blob([sourceData]);
      const targetPath = `elements/${elementId}.${elementFileType}`;
      await this.localStore.saveFile(worldID, targetPath, blob);

      console.log(
        `[MBZImporter] Element ${elementId}: Saved ${elementFileType}`,
      );
      return true;
    } catch (error) {
      const msg = `Element ${elementId}: Failed to save - ${error}`;
      console.error(`[MBZImporter] ${msg}`);
      this.errors.push(msg);
      return false;
    }
  }

  /**
   * Process H5P element (extract nested ZIP)
   */
  private async processH5PElement(
    element: LearningElement,
    h5pData: Uint8Array,
    worldID: number,
  ): Promise<boolean> {
    const { elementId, elementName } = element;

    try {
      // Load H5P file as nested ZIP using fflate
      console.log(`[MBZImporter] Element ${elementId}: Extracting H5P...`);

      const unzipped = unzipSync(h5pData);
      const fileCount = Object.keys(unzipped).length;

      console.log(
        `[MBZImporter] Element ${elementId}: Extracting H5P with ${fileCount} files`,
      );

      let savedCount = 0;
      for (const [fileName, fileData] of Object.entries(unzipped)) {
        try {
          const blob = new Blob([fileData]);
          const targetPath = `elements/${elementId}/${fileName}`;
          await this.localStore.saveFile(worldID, targetPath, blob);
          savedCount++;
        } catch (error) {
          console.warn(
            `[MBZImporter] H5P element ${elementId}: Failed to save ${fileName}`,
            error,
          );
        }
      }

      console.log(
        `[MBZImporter] Element ${elementId}: H5P extracted (${savedCount} files)`,
      );
      return savedCount > 0;
    } catch (error) {
      const msg = `Element ${elementId} (${elementName}): H5P extraction failed - ${error}`;
      console.error(`[MBZImporter] ${msg}`);
      this.warnings.push(msg);

      // Fallback: Save as regular file
      try {
        const blob = new Blob([h5pData]);
        const targetPath = `elements/${elementId}.h5p`;
        await this.localStore.saveFile(worldID, targetPath, blob);
        console.log(
          `[MBZImporter] Element ${elementId}: Saved as .h5p file (fallback)`,
        );
        return true;
      } catch (fallbackError) {
        this.errors.push(
          `Element ${elementId}: Complete failure - ${fallbackError}`,
        );
        return false;
      }
    }
  }

  /**
   * Find a file in the extracted files map (case-insensitive)
   */
  private findFileInExtracted(
    files: Map<string, Uint8Array>,
    fileName: string,
  ): { name: string; data: Uint8Array } | null {
    const normalizedSearch = fileName.normalize("NFC").toLowerCase();

    for (const [path, data] of files.entries()) {
      // Get base name from path
      const baseName = path.split("/").pop() || "";
      if (baseName.normalize("NFC").toLowerCase() === normalizedSearch) {
        return { name: path, data };
      }
    }

    return null;
  }
}
