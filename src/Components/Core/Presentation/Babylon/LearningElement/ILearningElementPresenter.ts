import { Vector3 } from "@babylonjs/core";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import LearningElementViewModel from "./LearningElementViewModel";

export default interface ILearningElementPresenter {
  presentLearningElement(
    learningElementTO: LearningElementTO,
    positions: [Vector3, number]
  ): void;
}
