import LocalWorldInfoTO from "../../DataTransferObjects/LocalWorldInfoTO";
import StorageInfoTO from "../../DataTransferObjects/StorageInfoTO";
import WorldImportResultTO from "../../DataTransferObjects/WorldImportResultTO";

/**
 * This interface is used to register with the WorldManagementPort and defines all the methods that can be called by the WorldManagementPort.
 */
export default interface IWorldManagementAdapter {
  onWorldImported?(result: WorldImportResultTO): void;
  onWorldDeleted?(worldID: number): void;
  onWorldExported?(worldID: number, fileData: Blob): void;
  onWorldPackageExported?(fileData: Blob): void;
  onStorageInfoLoaded?(storageInfo: StorageInfoTO): void;
  onLocalWorldsListLoaded?(worlds: LocalWorldInfoTO[]): void;
  onWorldManagementError?(error: string): void;
}
