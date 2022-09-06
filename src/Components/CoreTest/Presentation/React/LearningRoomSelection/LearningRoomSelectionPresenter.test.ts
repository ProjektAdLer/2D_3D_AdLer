import ILearningRoomSelectionPresenter from "./ILearningRoomSelectionPresenter";
import LearningRoomSelectionViewModel from "./LearningRoomSelectionViewModel";

export default class LearningRoomSelectionPresenter
  implements ILearningRoomSelectionPresenter
{
  constructor(private viewModel: LearningRoomSelectionViewModel) {}
}
