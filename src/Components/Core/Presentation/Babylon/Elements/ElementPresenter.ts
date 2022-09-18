import { Vector3 } from "@babylonjs/core";
import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";
import IElementPresenter from "./IElementPresenter";
import ElementViewModel from "./ElementViewModel";

export default class ElementPresenter implements IElementPresenter {
  constructor(private viewModel: ElementViewModel) {}
  public presentElement(
    elementTO: ElementTO,
    position: [Vector3, number]
  ): void {
    if (!this.viewModel) {
      throw new Error("ViewModel not set");
    }

    this.viewModel.id = elementTO.id;
    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.elementData.Value = elementTO.elementData;
  }
}
