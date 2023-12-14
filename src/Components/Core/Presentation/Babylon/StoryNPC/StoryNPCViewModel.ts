import { Mesh } from "@babylonjs/core";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";

export default class StoryNPCViewModel {
  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
}
