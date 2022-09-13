import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";
import {
  LearningElementType,
  LearningElementTypeStrings,
} from "../../../Babylon/LearningElement/Types/LearningElementTypes";
import ILearningRoomDetailPresenter from "./ILearningRoomDetailPresenter";
import LearningRoomDetailViewModel from "./LearningRoomDetailViewModel";

export default class LearningRoomDetailPresenter
  implements ILearningRoomDetailPresenter
{
  constructor(private viewModel: LearningRoomDetailViewModel) {}

  onLearningRoomLoaded(learningRoomTO: LearningRoomTO): void {
    this.viewModel.name.Value = learningRoomTO.name;
    this.viewModel.learningElements.Value = learningRoomTO.learningElements.map(
      (learningElementTO) => [
        learningElementTO.learningElementData
          .type as LearningElementTypeStrings,
        learningElementTO.name,
      ]
    );
  }
}
