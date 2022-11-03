import IScoreElementUseCase from "../../../../Application/UseCases/ScoreElement/IScoreElementUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import { ElementID } from "../../../../Domain/Types/EntityTypes";
import IElementModalController from "./IElementModalController";

export default class ElementModalController implements IElementModalController {
  async scoreElement(elementId: ElementID, courseId: ElementID): Promise<void> {
    await CoreDIContainer.get<IScoreElementUseCase>(
      USECASE_TYPES.IScoreElementUseCase
    ).executeAsync({
      elementId: elementId,
      courseId: courseId,
    });
  }
}
