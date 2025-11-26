import LocalWorldInfoTO from "../../DataTransferObjects/LocalWorldInfoTO";
import StorageInfoTO from "../../DataTransferObjects/StorageInfoTO";
import WorldImportResultTO from "../../DataTransferObjects/WorldImportResultTO";
import type { ValidationResult } from "../../Services/MBZValidator";

/**
 * This interface is used to register with the WorldManagementPort and defines all the methods that can be called by the WorldManagementPort.
 */
export default interface IWorldManagementAdapter {
  onWorldImported?(result: WorldImportResultTO): void;
  onWorldDeleted?(worldID: number): void;
  onWorldPackageExported?(fileData: Blob): void;
  onStorageInfoLoaded?(storageInfo: StorageInfoTO): void;
  onLocalWorldsListLoaded?(worlds: LocalWorldInfoTO[]): void;
  onWorldManagementError?(error: string): void;
  onImportValidationFailed?(validationResult: ValidationResult): void;
}
