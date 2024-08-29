import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ExitModalViewModel from "./ExitModalViewModel";
import ExitModalController from "./ExitModalController";
import ExitModalPresenter from "./ExitModalPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalController from "./IExitModalController";
import IExitModalPresenter from "./IExitModalPresenter";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class ExitModalBuilder extends PresentationBuilder<
  ExitModalViewModel,
  IExitModalController,
  undefined,
  IExitModalPresenter
> {
  constructor() {
    super(
      ExitModalViewModel,
      ExitModalController,
      undefined,
      ExitModalPresenter
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();

    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IExitModalPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IExitModalPresenter);
    }

    CoreDIContainer.bind<IExitModalPresenter>(
      PRESENTATION_TYPES.IExitModalPresenter
    ).toConstantValue(this.presenter!);
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
