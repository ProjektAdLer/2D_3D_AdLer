import { ActionEvent } from "@babylonjs/core";
import { inject, injectable } from "inversify";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";

@injectable()
export default class LearningElementController
  implements ILearningElementController
{
  clicked(event?: ActionEvent): void {
    throw new Error("Method not implemented.");
  }
}
