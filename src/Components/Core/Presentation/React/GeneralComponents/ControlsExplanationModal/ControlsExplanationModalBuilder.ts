import { injectable } from "inversify";
import ControlsExplanationModalPresenter from "./ControlsExplanationModalPresenter";
import IControlsExplanationModalPresenter from "./IControlsExplanationModalPresenter";
import ControlsExplanationModalViewModel from "./ControlsExplanationModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

@injectable()
export default class ControlsExplanationModalBuilder extends PresentationBuilder<
  ControlsExplanationModalViewModel,
  undefined,
  undefined,
  IControlsExplanationModalPresenter
> {
  constructor() {
    super(
      ControlsExplanationModalViewModel,
      undefined,
      undefined,
      ControlsExplanationModalPresenter
    );
  }

  buildPresenter(): void {
    super.buildPresenter();
    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.IControlsExplanationModalPresenter
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.IControlsExplanationModalPresenter
      );

    CoreDIContainer.bind<IControlsExplanationModalPresenter>(
      PRESENTATION_TYPES.IControlsExplanationModalPresenter
    ).toConstantValue(this.presenter!);
  }
}
