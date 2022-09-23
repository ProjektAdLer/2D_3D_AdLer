import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";

export default class DetailSectionPresenter implements IDetailSectionPresenter {
  constructor(private viewModel: DetailSectionViewModel) {}
  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;

    // TODO: set description when it exists
    this.viewModel.description.Value = "";

    // TODO: set requirements when they exist
    this.viewModel.requirements.Value = [];

    // TODO: set conditions when they exist
    this.viewModel.conditions.Value = [];

    this.viewModel.elements.Value = spaceTO.elements.map((elementTO) => [
      elementTO.elementData.type as ElementTypeStrings,
      elementTO.name,
    ]);
  }
}
