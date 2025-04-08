import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ProgressScorePanelViewModel from "./ProgessScorePanelViewModel";
import ProgressScorePanelPresenter from "./ProgressScorePanelPresenter";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IGetLearningWorldUseCase from "src/Components/Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class ProgressScorePanelBuilder extends PresentationBuilder<
  ProgressScorePanelViewModel,
  undefined,
  undefined,
  ProgressScorePanelPresenter
> {
  constructor() {
    super(
      ProgressScorePanelViewModel,
      undefined,
      undefined,
      ProgressScorePanelPresenter,
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
