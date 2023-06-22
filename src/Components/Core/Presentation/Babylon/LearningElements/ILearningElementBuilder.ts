import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { Vector3 } from "@babylonjs/core";

export default interface ILearningElementBuilder
  extends IAsyncPresentationBuilder {
  elementData: LearningElementTO;
  elementPosition: [Vector3, number];
}
