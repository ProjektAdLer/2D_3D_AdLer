import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import WorldMenuButtonViewModel from "./WorldMenuButtonViewModel";
import WorldMenuButtonPresenter from "./WorldMenuButtonPresenter";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILMSAdapter from "src/Components/Core/Application/Ports/LMSPort/ILMSAdapter";

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
    CoreDIContainer.get<AbstractPort<ILMSAdapter>>(
      PORT_TYPES.ILMSPort
    ).registerAdapter(this.presenter!);
  }
}
