import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import WorldManagerModalController from "./WorldManagerModalController";
import WorldManagerModalPresenter from "./WorldManagerModalPresenter";
import type IWorldManagerModalController from "./IWorldManagerModalController";
import type IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import type IImportLearningWorldUseCase from "../../../../Application/UseCases/ImportLearningWorld/IImportLearningWorldUseCase";
import type IDeleteLearningWorldUseCase from "../../../../Application/UseCases/DeleteLearningWorld/IDeleteLearningWorldUseCase";
import type IExportLearningWorldUseCase from "../../../../Application/UseCases/ExportLearningWorld/IExportLearningWorldUseCase";
import type IExportWorldPackageUseCase from "../../../../Application/UseCases/ExportWorldPackage/IExportWorldPackageUseCase";
import type ILoadLocalWorldsListUseCase from "../../../../Application/UseCases/LoadLocalWorldsList/ILoadLocalWorldsListUseCase";
import type IGetWorldsStorageInfoUseCase from "../../../../Application/UseCases/GetWorldsStorageInfo/IGetWorldsStorageInfoUseCase";
import type IWorldManagementPort from "../../../../Application/Ports/Interfaces/IWorldManagementPort";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

/**
 * Builder for WorldManagerModal
 * Creates and wires up the MVC components following the Builder pattern
 */
@injectable()
export default class WorldManagerModalBuilder extends PresentationBuilder<
  WorldManagerModalViewModel,
  IWorldManagerModalController,
  undefined,
  IWorldManagerModalPresenter
> {
  constructor() {
    super(
      WorldManagerModalViewModel,
      undefined, // Controller wird in buildController() manuell erstellt
      undefined,
      WorldManagerModalPresenter,
    );
  }

  /**
   * Override buildController to inject Use Cases
   */
  override buildController(): void {
    if (!this.viewModel) {
      throw new Error("Cannot build controller without view model");
    }

    // Get Use Cases from DI container
    const importWorldUseCase = CoreDIContainer.get<IImportLearningWorldUseCase>(
      USECASE_TYPES.IImportLearningWorldUseCase,
    );
    const deleteWorldUseCase = CoreDIContainer.get<IDeleteLearningWorldUseCase>(
      USECASE_TYPES.IDeleteLearningWorldUseCase,
    );
    const exportWorldUseCase = CoreDIContainer.get<IExportLearningWorldUseCase>(
      USECASE_TYPES.IExportLearningWorldUseCase,
    );
    const exportWorldPackageUseCase =
      CoreDIContainer.get<IExportWorldPackageUseCase>(
        USECASE_TYPES.IExportWorldPackageUseCase,
      );
    const loadLocalWorldsListUseCase =
      CoreDIContainer.get<ILoadLocalWorldsListUseCase>(
        USECASE_TYPES.ILoadLocalWorldsListUseCase,
      );
    const getStorageInfoUseCase =
      CoreDIContainer.get<IGetWorldsStorageInfoUseCase>(
        USECASE_TYPES.IGetWorldsStorageInfoUseCase,
      );

    // Create controller with injected Use Cases
    this.controller = new WorldManagerModalController(
      this.viewModel,
      importWorldUseCase,
      deleteWorldUseCase,
      exportWorldUseCase,
      exportWorldPackageUseCase,
      loadLocalWorldsListUseCase,
      getStorageInfoUseCase,
    );
  }

  /**
   * Override buildPresenter to register it with the WorldManagementPort
   */
  override buildPresenter(): void {
    super.buildPresenter();

    // Register presenter with WorldManagementPort so it receives notifications from Use Cases
    const worldManagementPort = CoreDIContainer.get<IWorldManagementPort>(
      PORT_TYPES.IWorldManagementPort,
    );
    worldManagementPort.registerAdapter(
      this.presenter!,
      HistoryWrapper.currentLocationScope(),
    );
  }
}
