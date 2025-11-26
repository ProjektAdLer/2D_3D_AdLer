/**
 * Validation result containing errors and warnings
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * Validation error with code, user message, and technical details
 */
export interface ValidationError {
  code: string; // Error code for programmatic handling (e.g., "FILE_TOO_LARGE")
  message: string; // User-friendly message
  technicalDetails: string; // Technical details for debugging
}

/**
 * Validation warning (non-critical issues)
 */
export interface ValidationWarning {
  code: string;
  message: string;
}

/**
 * World document interface (ATF/DSL/AWT format)
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
 * Learning element interface
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
 * MBZValidator provides comprehensive validation for MBZ (Moodle Backup) files.
 *
 * Validation is performed in multiple phases:
 * - Phase 1: Pre-extraction (file size, magic numbers)
 * - Phase 2: Post-extraction (structure, paths)
 * - Phase 3: Content (world document, JSON schema)
 *
 * This class belongs to the Application layer and contains business logic for validation.
 * It is independent of infrastructure concerns and can be used by any adapter or use case.
 */
export default class MBZValidator {
  // Validation constants
  private readonly MAX_FILE_SIZE = 950 * 1024 * 1024; // 950 MB
  private readonly MAX_EXTRACTED_SIZE = 2 * 1024 * 1024 * 1024; // 2 GB
  private readonly MAX_WORLD_NAME_LENGTH = 200;

  // Allowed element categories (whitelist)
  private readonly ALLOWED_ELEMENT_CATEGORIES = [
    "h5p",
    "primitiveH5P",
    "adaptivity",
    "video",
    "image",
    "pdf",
    "text",
  ];

  /**
   * Validate file size against maximum limit
   * @param file The file to validate
   * @returns Validation result
   */
  validateFileSize(file: File): ValidationResult {
    if (file.size > this.MAX_FILE_SIZE) {
      const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
      const maxSizeInMB = (this.MAX_FILE_SIZE / 1024 / 1024).toFixed(0);

      return {
        isValid: false,
        errors: [
          {
            code: "FILE_TOO_LARGE",
            message: `Die Datei ist zu groß. Maximum: ${maxSizeInMB} MB.`,
            technicalDetails: `File size: ${sizeInMB} MB, Limit: ${maxSizeInMB} MB`,
          },
        ],
        warnings: [],
      };
    }

    return { isValid: true, errors: [], warnings: [] };
  }

  /**
   * Validate file type by checking extension and magic numbers
   * @param file The file to validate
   * @returns Validation result
   */
  async validateFileType(file: File): Promise<ValidationResult> {
    const errors: ValidationError[] = [];

    // Check file extension
    if (!file.name.endsWith(".mbz") && !file.name.endsWith(".tar.gz")) {
      const extension = file.name.split(".").pop() || "unknown";
      errors.push({
        code: "INVALID_EXTENSION",
        message: "Ungültiges Dateiformat. Bitte lade eine .mbz Datei hoch.",
        technicalDetails: `Extension: .${extension}, Expected: .mbz or .tar.gz`,
      });
      return { isValid: false, errors, warnings: [] };
    }

    // Check magic numbers (gzip header: 0x1F 0x8B)
    try {
      const headerBuffer = await file.slice(0, 2).arrayBuffer();
      const header = new Uint8Array(headerBuffer);

      if (header.length < 2 || header[0] !== 0x1f || header[1] !== 0x8b) {
        const actualHex =
          header.length >= 2
            ? `${header[0].toString(16).padStart(2, "0")} ${header[1].toString(16).padStart(2, "0")}`
            : "empty";

        errors.push({
          code: "INVALID_GZIP_MAGIC",
          message:
            "Die Datei ist keine gültige MBZ-Datei. Bitte prüfe das Dateiformat.",
          technicalDetails: `Magic bytes: ${actualHex}, Expected: 1f 8b (gzip)`,
        });
        return { isValid: false, errors, warnings: [] };
      }
    } catch (error) {
      errors.push({
        code: "FILE_READ_ERROR",
        message: "Die Datei konnte nicht gelesen werden.",
        technicalDetails: `Error reading file header: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
      return { isValid: false, errors, warnings: [] };
    }

    return { isValid: true, errors: [], warnings: [] };
  }

  /**
   * Validate MBZ structure (check for required files)
   * @param extractedFiles Map of extracted file paths to file data
   * @returns Validation result
   */
  validateMBZStructure(
    extractedFiles: Map<string, Uint8Array>,
  ): ValidationResult {
    const errors: ValidationError[] = [];

    // Check for world document (ATF_Document.json, DSL_Document.json, or world.json)
    const hasATF = extractedFiles.has("ATF_Document.json");
    const hasDSL = extractedFiles.has("DSL_Document.json");
    const hasWorld = extractedFiles.has("world.json");

    if (!hasATF && !hasDSL && !hasWorld) {
      errors.push({
        code: "MISSING_WORLD_DOCUMENT",
        message: "Die MBZ-Datei enthält kein gültiges Weltdokument.",
        technicalDetails:
          "Missing required file: ATF_Document.json, DSL_Document.json, or world.json",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: [],
    };
  }

  /**
   * Validate file paths for security issues (path traversal, null bytes, etc.)
   * @param files Map of file paths to file data
   * @returns Validation result
   */
  validateFilePaths(files: Map<string, Uint8Array>): ValidationResult {
    const errors: ValidationError[] = [];
    const seenErrors = new Set<string>(); // Avoid duplicate errors

    for (const [path, _] of files.entries()) {
      // Check for path traversal attempts
      if (path.includes("..") || path.startsWith("/")) {
        if (!seenErrors.has("PATH_TRAVERSAL")) {
          errors.push({
            code: "INVALID_FILE_PATH",
            message: "Die MBZ-Datei enthält ungültige Dateipfade.",
            technicalDetails: `Invalid path detected: ${path}`,
          });
          seenErrors.add("PATH_TRAVERSAL");
        }
        continue;
      }

      // Check for null bytes and control characters
      if (/[\x00-\x1F]/.test(path)) {
        if (!seenErrors.has("CONTROL_CHARS")) {
          errors.push({
            code: "INVALID_FILE_PATH",
            message: "Die MBZ-Datei enthält ungültige Dateipfade.",
            technicalDetails: `Path contains control characters: ${path}`,
          });
          seenErrors.add("CONTROL_CHARS");
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: [],
    };
  }

  /**
   * Validate world document structure and content
   * @param worldDoc The world document to validate
   * @returns Validation result
   */
  validateWorldDocument(worldDoc: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check $type field
    if (!worldDoc.$type || !["ATF", "DSL", "AWT"].includes(worldDoc.$type)) {
      errors.push({
        code: "INVALID_WORLD_TYPE",
        message: "Das Weltdokument hat einen ungültigen Typ.",
        technicalDetails: `$type: ${worldDoc.$type}, expected: ATF, DSL, or AWT`,
      });
    }

    // Check world object exists
    if (!worldDoc.world) {
      errors.push({
        code: "MISSING_WORLD_OBJECT",
        message: "Das Weltdokument ist unvollständig.",
        technicalDetails: "Missing required field: world",
      });
      return { isValid: false, errors, warnings }; // Early return
    }

    // Check worldName (required field)
    if (
      !worldDoc.world.worldName ||
      typeof worldDoc.world.worldName !== "string"
    ) {
      errors.push({
        code: "MISSING_WORLD_NAME",
        message: "Das Weltdokument enthält keinen Weltnamen.",
        technicalDetails: "Missing or invalid field: world.worldName",
      });
    }

    // Check worldName length
    if (
      worldDoc.world.worldName &&
      worldDoc.world.worldName.length > this.MAX_WORLD_NAME_LENGTH
    ) {
      errors.push({
        code: "WORLD_NAME_TOO_LONG",
        message: `Der Weltname ist zu lang (max. ${this.MAX_WORLD_NAME_LENGTH} Zeichen).`,
        technicalDetails: `worldName length: ${worldDoc.world.worldName.length}, max: ${this.MAX_WORLD_NAME_LENGTH}`,
      });
    }

    // Check spaces array
    if (!Array.isArray(worldDoc.world.spaces)) {
      errors.push({
        code: "INVALID_SPACES",
        message: "Das Weltdokument enthält keine gültige Raum-Liste.",
        technicalDetails: "world.spaces must be an array",
      });
    }

    // Check elements array
    if (!Array.isArray(worldDoc.world.elements)) {
      errors.push({
        code: "INVALID_ELEMENTS",
        message: "Das Weltdokument enthält keine gültige Element-Liste.",
        technicalDetails: "world.elements must be an array",
      });
      return { isValid: false, errors, warnings }; // Early return
    }

    // Validate each element
    worldDoc.world.elements.forEach((element: any, index: number) => {
      // Check required fields
      const requiredFields = [
        "elementId",
        "elementName",
        "elementCategory",
        "elementFileType",
      ];

      for (const field of requiredFields) {
        if (element[field] === undefined || element[field] === null) {
          errors.push({
            code: "INVALID_ELEMENT_STRUCTURE",
            message: `Element ${index + 1} ist unvollständig.`,
            technicalDetails: `Element ${index}: missing field '${field}'`,
          });
        }
      }

      // Type validation for elementId
      if (
        element.elementId !== undefined &&
        typeof element.elementId !== "number"
      ) {
        errors.push({
          code: "INVALID_ELEMENT_ID",
          message: `Element ${index + 1} hat eine ungültige ID.`,
          technicalDetails: `Element ${index}: elementId must be a number, got ${typeof element.elementId}`,
        });
      }

      // Category whitelist validation (warning only, not blocking)
      if (
        element.elementCategory &&
        !this.ALLOWED_ELEMENT_CATEGORIES.includes(element.elementCategory)
      ) {
        warnings.push({
          code: "UNKNOWN_ELEMENT_CATEGORY",
          message: `Element ${index + 1}: Unbekannte Kategorie "${element.elementCategory}"`,
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate extracted size against decompression bomb limit
   * @param extractedSize Total size of extracted files in bytes
   * @returns Validation result
   */
  validateDecompressionBomb(extractedSize: number): ValidationResult {
    if (extractedSize > this.MAX_EXTRACTED_SIZE) {
      const sizeInGB = (extractedSize / 1024 / 1024 / 1024).toFixed(2);
      const maxSizeInGB = (
        this.MAX_EXTRACTED_SIZE /
        1024 /
        1024 /
        1024
      ).toFixed(0);

      return {
        isValid: false,
        errors: [
          {
            code: "DECOMPRESSION_BOMB",
            message:
              "Die Datei ist zu groß entpackt. Möglicherweise beschädigt.",
            technicalDetails: `Extracted size: ${sizeInGB} GB, exceeds limit of ${maxSizeInGB} GB`,
          },
        ],
        warnings: [],
      };
    }

    return { isValid: true, errors: [], warnings: [] };
  }
}
