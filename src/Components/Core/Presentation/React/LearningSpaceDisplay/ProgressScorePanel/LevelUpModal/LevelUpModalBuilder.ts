import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";
import LevelUpModalViewModel from "./LevelUpModalViewModel";
import LevelUpModalPresenter from "./LevelUpModalPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import { ILevelUpModalPresenter } from "./ILevelUpModalPresenter";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import LevelUpModalController from "./LevelUpModalController";
import ILevelUpModalController from "./ILevelUpModalController";
import { injectable } from "inversify";

@injectable()
export default class LevelUpModalBuilder extends PresentationBuilder<
  LevelUpModalViewModel,
  ILevelUpModalController,
  undefined,
  ILevelUpModalPresenter
> {
  constructor() {
    super(
      LevelUpModalViewModel,
      LevelUpModalController,
      undefined,
      LevelUpModalPresenter,
    );
  }

  override buildViewModel(): void {
    super.buildViewModel();
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (CoreDIContainer.isBound(PRESENTATION_TYPES.ILevelUpModalPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.ILevelUpModalPresenter);
    }

    CoreDIContainer.bind<ILevelUpModalPresenter>(
      PRESENTATION_TYPES.ILevelUpModalPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
