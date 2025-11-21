import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import MBZImportButtonViewModel from "./MBZImportButtonViewModel";
import MBZImportButtonController from "./MBZImportButtonController";
import MBZImportButtonPresenter from "./MBZImportButtonPresenter";
import type IMBZImportButtonController from "./IMBZImportButtonController";
import type IMBZImportButtonPresenter from "./IMBZImportButtonPresenter";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import type IImportLearningWorldUseCase from "../../../../Application/UseCases/ImportLearningWorld/IImportLearningWorldUseCase";
import type ILoadUserLearningWorldsInfoUseCase from "../../../../Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";
import type IWorldManagementPort from "../../../../Application/Ports/Interfaces/IWorldManagementPort";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

/**
 * Builder for MBZImportButton
 * Creates and wires up the MVC components following the Builder pattern
 */
@injectable()
export default class MBZImportButtonBuilder extends PresentationBuilder<
  MBZImportButtonViewModel,
  IMBZImportButtonController,
  undefined,
  IMBZImportButtonPresenter
> {
  constructor() {
    super(
      MBZImportButtonViewModel,
      undefined, // Controller wird in buildController() manuell erstellt
      undefined,
      MBZImportButtonPresenter,
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
    const loadUserWorldsInfoUseCase =
      CoreDIContainer.get<ILoadUserLearningWorldsInfoUseCase>(
        USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase,
      );

    // Create controller with injected Use Cases
    this.controller = new MBZImportButtonController(
      this.viewModel,
      importWorldUseCase,
      loadUserWorldsInfoUseCase,
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
