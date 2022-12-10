import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import ILMSPort from "../../../../Ports/LMSPort/ILMSPort";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import WorldMenuButtonViewModel from "./WorldMenuButtonViewModel";
import WorldMenuButtonPresenter from "./WorldMenuButtonPresenter";

@injectable()
export default class WorldMenuButtonBuilder extends PresentationBuilder<
  WorldMenuButtonViewModel,
  undefined,
  undefined,
  WorldMenuButtonPresenter
> {
  constructor() {
    super(
      WorldMenuButtonViewModel,
      undefined,
      undefined,
      WorldMenuButtonPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILMSPort>(
      PORT_TYPES.IMoodlePort
    ).registerWorldMenuButtonPresenter(this.presenter!);
  }
}
