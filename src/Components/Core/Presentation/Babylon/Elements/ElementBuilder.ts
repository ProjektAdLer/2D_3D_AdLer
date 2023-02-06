import { injectable } from "inversify";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import IElementController from "./IElementController";
import IElementPresenter from "./IElementPresenter";
import ElementController from "./ElementController";
import ElementPresenter from "./ElementPresenter";
import ElementView from "./ElementView";
import ElementViewModel from "./ElementViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";

@injectable()
export default class ElementBuilder extends PresentationBuilder<
  ElementViewModel,
  IElementController,
  ElementView,
  IElementPresenter
> {
  constructor() {
    super(ElementViewModel, ElementController, ElementView, ElementPresenter);
  }

  buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
