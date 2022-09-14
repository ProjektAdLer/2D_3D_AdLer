import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";
import {
  LearningElementType,
  LearningElementTypeStrings,
} from "../../../Babylon/LearningElement/Types/LearningElementTypes";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";

export default class DetailSectionPresenter implements IDetailSectionPresenter {
  constructor(private viewModel: DetailSectionViewModel) {}

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
