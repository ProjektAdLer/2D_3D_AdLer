import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import BottomTooltipPresenter from "./BottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import IBottomTooltipController from "./IBottomTooltipController";
import BottomTooltipController from "./BottomTooltipController";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

@injectable()
export default class BottomTooltipBuilder extends PresentationBuilder<
  BottomTooltipViewModel,
  IBottomTooltipController,
  undefined,
  IBottomTooltipPresenter
> {
  constructor() {
    super(
      BottomTooltipViewModel,
      BottomTooltipController,
      undefined,
      BottomTooltipPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IBottomTooltipPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IBottomTooltipPresenter);
    }

    CoreDIContainer.bind<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
