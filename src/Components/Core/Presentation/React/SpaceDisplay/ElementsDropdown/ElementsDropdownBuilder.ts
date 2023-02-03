import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ElementsDropdownController from "./ElementsDropdownController";
import ElementsDropdownPresenter from "./ElementsDropdownPresenter";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";

@injectable()
export default class ElementsDropdownBuilder extends PresentationBuilder<
  ElementsDropdownViewModel,
  ElementsDropdownController,
  undefined,
  ElementsDropdownPresenter
> {
  constructor() {
    super(
      ElementsDropdownViewModel,
      ElementsDropdownController,
      undefined,
      ElementsDropdownPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
