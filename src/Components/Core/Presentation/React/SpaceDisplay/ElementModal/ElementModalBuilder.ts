import { injectable } from "inversify";
import IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ElementModalController from "./ElementModalController";
import ElementModalPresenter from "./ElementModalPresenter";
import ElementModalViewModel from "./ElementModalViewModel";
import IElementModalController from "./IElementModalController";
import IElementModalPresenter from "./IElementModalPresenter";

@injectable()
export default class ElementModalBuilder extends PresentationBuilder<
  ElementModalViewModel,
  IElementModalController,
  undefined,
  IElementModalPresenter
> {
  constructor() {
    super(
      ElementModalViewModel,
      ElementModalController,
      undefined,
      ElementModalPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
