import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";
import {
  LearningElementType,
  LearningElementTypeStrings,
} from "../../../Babylon/LearningElement/Types/LearningElementTypes";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";

export default class DetailSectionPresenter implements IDetailSectionPresenter {
  constructor(private viewModel: DetailSectionViewModel) {}
  onRoomDataLoaded(learningRoomTO: LearningRoomTO): void {
    this.viewModel.name.Value = learningRoomTO.name;

    // TODO: set description when it exists
    this.viewModel.description.Value = "";

    // TODO: set requirements when they exist
    this.viewModel.requirements.Value = [];

    // TODO: set conditions when they exist
    this.viewModel.conditions.Value = [];

    this.viewModel.learningElements.Value = learningRoomTO.learningElements.map(
      (learningElementTO) => [
        learningElementTO.learningElementData
          .type as LearningElementTypeStrings,
        learningElementTO.name,
      ]
    );
  }
}
