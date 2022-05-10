import { IDTO } from "../Abstract/IDTO";
import ILearningElementStartedUseCase from "./ILearningElementStartedUseCase";

export default class LearningElementStartedUseCase
  implements ILearningElementStartedUseCase
{
  executeAsync(data?: IDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
