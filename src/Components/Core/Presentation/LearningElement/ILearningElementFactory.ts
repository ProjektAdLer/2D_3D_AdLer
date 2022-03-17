import { Vector3 } from "@babylonjs/core";
import ILearningElementPresenter from "./ILearningElementPresenter";
import { LearningElementTypes } from "./Types/LearningElementTypes";

export default interface ILearningElementFactory {
  createLearningElementAsync(
    type: LearningElementTypes,
    positions: Vector3,
    rotations: number
  ): Promise<ILearningElementPresenter>;
}
