import { injectable } from "inversify";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../../PresentationBuilder/PresentationBuilder";
import ExperiencePointsPanelPresenter from "./ExperiencePointsPanelPresenter";
import ExperiencePointsPanelViewModel from "./ExperiencePointsPanelViewModel";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetExperiencePointsUseCase from "src/Components/Core/Application/UseCases/GetExperiencePoints/IGetExperiencePoints";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class ExperiencePointsPanelBuilder extends PresentationBuilder<
  ExperiencePointsPanelViewModel,
  undefined,
  undefined,
  ExperiencePointsPanelPresenter
> {
  constructor() {
    super(
      ExperiencePointsPanelViewModel,
      undefined,
      undefined,
      ExperiencePointsPanelPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());

    CoreDIContainer.get<IGetExperiencePointsUseCase>(
      USECASE_TYPES.IGetExperiencePointsUseCase,
    ).execute();
  }
}
