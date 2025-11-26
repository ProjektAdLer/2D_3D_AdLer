import { injectable } from "inversify";
import bind from "bind-decorator";
import IWorldManagementPort from "../Interfaces/IWorldManagementPort";
import IWorldManagementAdapter from "./IWorldManagementAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import WorldImportResultTO from "../../DataTransferObjects/WorldImportResultTO";
import LocalWorldInfoTO from "../../DataTransferObjects/LocalWorldInfoTO";
import StorageInfoTO from "../../DataTransferObjects/StorageInfoTO";
import type { ValidationResult } from "../../Services/MBZValidator";

@injectable()
export default class WorldManagementPort
  extends AbstractPort<IWorldManagementAdapter>
  implements IWorldManagementPort
{
  @bind
  name(): string {
    return "WORLDMANAGEMENT-PORT";
  }

  public onWorldImported(result: WorldImportResultTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onWorldImported) value.onWorldImported(result);
      });
    });
  }

  public onWorldDeleted(worldID: number): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onWorldDeleted) value.onWorldDeleted(worldID);
      });
    });
  }

  public onWorldPackageExported(fileData: Blob): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onWorldPackageExported)
          value.onWorldPackageExported(fileData);
      });
    });
  }

  public onStorageInfoLoaded(storageInfo: StorageInfoTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onStorageInfoLoaded) value.onStorageInfoLoaded(storageInfo);
      });
    });
  }

  public onLocalWorldsListLoaded(worlds: LocalWorldInfoTO[]): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLocalWorldsListLoaded)
          value.onLocalWorldsListLoaded(worlds);
      });
    });
  }

  public onWorldManagementError(error: string): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onWorldManagementError) value.onWorldManagementError(error);
      });
    });
  }

  public onImportValidationFailed(validationResult: ValidationResult): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onImportValidationFailed)
          value.onImportValidationFailed(validationResult);
      });
    });
  }
}
