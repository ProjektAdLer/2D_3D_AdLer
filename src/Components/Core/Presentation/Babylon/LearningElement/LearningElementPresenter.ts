import { Vector3 } from "@babylonjs/core";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";

export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  constructor(private viewModel: LearningElementViewModel) {}
  public presentLearningElement(
    learningElementTO: LearningElementTO,
    position: [Vector3, number]
  ): void {
    if (!this.viewModel) {
      throw new Error("ViewModel not set");
    }

    this.viewModel.id = learningElementTO.id;
    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
    this.viewModel.name.Value = learningElementTO.name;
    this.viewModel.learningElementData.Value =
      learningElementTO.learningElementData;
  }
}
