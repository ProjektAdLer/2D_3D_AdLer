import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";

export default class DetailSectionPresenter implements IDetailSectionPresenter {
  constructor(private viewModel: DetailSectionViewModel) {}
  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
    // TODO: set description when it exists
    this.viewModel.description.Value = spaceTO.description;
    // TODO: set requirements when they exist, this needs to be calcculated before TODOPG
    //this.viewModel.requirements.Value = spaceTO.requirements; TODOPG
    // TODO: set conditions when they exist, they need to be calculated before TODOPG
    this.viewModel.conditions.Value = [];
    this.viewModel.elements.Value = spaceTO.elements.map((elementTO) => [
      elementTO.type as ElementTypeStrings,
      elementTO.name,
    ]);
  }
}
