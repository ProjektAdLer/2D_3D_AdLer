import { injectable } from "inversify";
import IElementPort from "../../../Ports/ElementPort/IElementPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import IElementController from "./IElementController";
import IElementPresenter from "./IElementPresenter";
import IElementView from "./IElementView";
import ElementController from "./ElementController";
import ElementPresenter from "./ElementPresenter";
import ElementView from "./ElementView";
import ElementViewModel from "./ElementViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";

@injectable()
export default class ElementBuilder extends PresentationBuilder<
  ElementViewModel,
  IElementController,
  IElementView,
  IElementPresenter
> {
  constructor() {
    super(ElementViewModel, ElementController, ElementView, ElementPresenter);
  }

  buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IElementPort>(
      PORT_TYPES.IElementPort
    ).addElementPresenter(this.presenter!);
  }
}
