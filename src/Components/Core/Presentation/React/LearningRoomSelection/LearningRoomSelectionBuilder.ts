import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import LearningRoomSelectionController from "./LearningRoomSelectionController";
import LearningRoomSelectionPresenter from "./LearningRoomSelectionPresenter";
import LearningRoomSelectionViewModel from "./LearningRoomSelectionViewModel";

@injectable()
export default class LearningRoomSelectionBuilder extends PresentationBuilder<
  LearningRoomSelectionViewModel,
  LearningRoomSelectionController,
  undefined,
  LearningRoomSelectionPresenter
> {
  constructor() {
    super(
      LearningRoomSelectionViewModel,
      LearningRoomSelectionController,
      undefined,
      LearningRoomSelectionPresenter
    );
  }
}
