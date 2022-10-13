import { Vector3 } from "@babylonjs/core";
import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import IElementPresenter from "./IElementPresenter";
import ElementViewModel from "./ElementViewModel";

export default class ElementPresenter implements IElementPresenter {
  constructor(private viewModel: ElementViewModel) {}

  onElementScored(hasScored: boolean, elementID: number): void {
    if (this.viewModel.id === elementID) {
      this.viewModel.hasScored.Value = hasScored;
    }
  }

  presentElement(elementTO: ElementTO, position: [Vector3, number]): void {
    if (!this.viewModel) {
      throw new Error("ViewModel not set");
    }

    this.viewModel.id = elementTO.id;
    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.type.Value = elementTO.type;
    this.viewModel.description.Value = elementTO.description;
    this.viewModel.goals.Value = elementTO.goals;
    this.viewModel.value.Value = elementTO.value;
    this.viewModel.hasScored.Value = elementTO.hasScored;
  }
}
