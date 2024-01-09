import { Mesh } from "@babylonjs/core";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";

export default class StoryNPCViewModel {
  public readonly iconYOffset: number = 2.3;

  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
}
