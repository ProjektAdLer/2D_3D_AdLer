import { Vector3 } from "@babylonjs/core";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";

export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  constructor(private viewModel: LearningElementViewModel) {}

  onLearningElementScored(hasScored: boolean, elementID: number): void {
    if (this.viewModel.id === elementID) {
      this.viewModel.hasScored.Value = hasScored;
    }
  }

  presentLearningElement(
    elementTO: LearningElementTO,
    position: [Vector3, number]
  ): void {
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
