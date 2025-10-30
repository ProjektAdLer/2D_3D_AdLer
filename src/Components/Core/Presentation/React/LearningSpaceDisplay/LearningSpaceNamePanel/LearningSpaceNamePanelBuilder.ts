import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LearningSpaceNamePanelController from "./LearningSpaceNamePanelController";
import LearningSpaceNamePanelPresenter from "./LearningSpaceNamePanelPresenter";
import LearningSpaceNamePanelViewModel from "./LearningSpaceNamePanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import ILearningSpaceNamePanelController from "./ILearningSpaceNamePanelController";
import ILearningSpaceNamePanelPresenter from "./ILearningSpaceNamePanelPresenter";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IGetLearningWorldUseCase from "src/Components/Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

@injectable()
export default class LearningSpaceNamePanelBuilder extends PresentationBuilder<
  LearningSpaceNamePanelViewModel,
  ILearningSpaceNamePanelController,
  undefined,
  ILearningSpaceNamePanelPresenter
> {
  constructor() {
    super(
      LearningSpaceNamePanelViewModel,
      LearningSpaceNamePanelController,
      undefined,
      LearningSpaceNamePanelPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
    CoreDIContainer.get<IGetLearningWorldUseCase>(
      USECASE_TYPES.IGetLearningWorldUseCase,
    ).execute();
  }
}
