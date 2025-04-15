import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CinemaStripesViewModel from "./CinemaStripesViewModel";
import CinemaStripesController from "./CinemaStripesController";
import CinemaStripesPresenter from "./CinemaStripesPresenter";
import ICinemaStripesController from "./ICinemaStripesController";
import ICinemaStripesPresenter from "./ICinemaStripesPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class CinemaStripesBuilder extends PresentationBuilder<
  CinemaStripesViewModel,
  ICinemaStripesController,
  undefined,
  ICinemaStripesPresenter
> {
  constructor() {
    super(
      CinemaStripesViewModel,
      CinemaStripesController,
      undefined,
      CinemaStripesPresenter,
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.bind<ICinemaStripesPresenter>(
      PRESENTATION_TYPES.ICinemaStripesPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, LocationScope._sceneRendering);
  }
  override buildViewModel(): void {
    super.buildViewModel();
  }
  override buildController(): void {
    super.buildController();
  }
}
