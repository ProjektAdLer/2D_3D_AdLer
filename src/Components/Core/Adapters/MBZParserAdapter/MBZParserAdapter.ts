import { inject, injectable } from "inversify";
import IMBZParserAdapter, {
  ParsedWorldData,
  ProgressCallback,
} from "../../Application/Ports/MBZParserPort/IMBZParserAdapter";
import MBZImporter from "../LocalStore/MBZImporter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldStorageAdapter from "../../Application/Ports/WorldStoragePort/IWorldStorageAdapter";

/**
 * Adapter that wraps MBZImporter and implements IMBZParserAdapter.
 * This allows the Application layer to parse MBZ files without directly depending on MBZImporter.
 */
@injectable()
export default class MBZParserAdapter implements IMBZParserAdapter {
  constructor(
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
  ) {}

  async parseMBZ(
    file: File,
    onProgress?: ProgressCallback,
  ): Promise<ParsedWorldData> {
    // Ensure storage is initialized
    await this.worldStorage.init();

    // MBZImporter expects a LocalStore instance, but we need to access the underlying LocalStore
    // from our WorldStorageAdapter. For now, we'll create a new LocalStore instance.
    // This is a temporary solution - ideally, WorldStorageAdapter should expose the LocalStore
    // or MBZImporter should be refactored to use IWorldStorageAdapter.
    const LocalStore = (await import("../LocalStore/LocalStore")).default;
    const localStore = new LocalStore();
    await localStore.init();

    const importer = new MBZImporter(localStore);
    const result = await importer.importMBZ(file, onProgress);

    if (!result.success) {
      throw new Error(
        result.errors.length > 0
          ? result.errors.join(", ")
          : "MBZ import failed",
      );
    }

    // Calculate total size of imported world
    const sizeInBytes = await this.worldStorage.getWorldSize(result.worldID);

    return {
      worldID: result.worldID,
      worldName: result.worldName,
      worldFolder: result.worldName,
      elementCount: result.elementCount,
      sizeInBytes,
      warnings: result.warnings,
    };
  }

  async validateMBZ(file: File): Promise<boolean> {
    // Basic validation: check file extension and size
    if (!file.name.endsWith(".mbz") && !file.name.endsWith(".tar.gz")) {
      return false;
    }

    // Check file is not empty
    if (file.size === 0) {
      return false;
    }

    // File seems valid (detailed validation happens during parsing)
    return true;
  }
}
