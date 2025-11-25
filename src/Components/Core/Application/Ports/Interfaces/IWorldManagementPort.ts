import LocalWorldInfoTO from "../../DataTransferObjects/LocalWorldInfoTO";
import StorageInfoTO from "../../DataTransferObjects/StorageInfoTO";
import WorldImportResultTO from "../../DataTransferObjects/WorldImportResultTO";
import { IAbstractPort } from "./IAbstractPort";
import IWorldManagementAdapter from "../WorldManagementPort/IWorldManagementAdapter";

export default interface IWorldManagementPort
  extends IAbstractPort<IWorldManagementAdapter> {
  onWorldImported(result: WorldImportResultTO): void;
  onWorldDeleted(worldID: number): void;
  onWorldPackageExported(fileData: Blob): void;
  onStorageInfoLoaded(storageInfo: StorageInfoTO): void;
  onLocalWorldsListLoaded(worlds: LocalWorldInfoTO[]): void;
  onWorldManagementError(error: string): void;
}
