import { Vector3 } from "@babylonjs/core";
import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";
import LearningElementViewModel from "./LearningElementViewModel";

export default interface ILearningElementPresenter {
  presentLearningElement(
    learningElementTO: LearningElementTO,
    positions: [Vector3, number]
  ): void;
}
