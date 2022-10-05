import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";
import { logger } from "src/Lib/Logger";

export default class DetailSectionPresenter implements IDetailSectionPresenter {
  constructor(private viewModel: DetailSectionViewModel) {}
  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    !spaceTO.name && logger.warn("SpaceTO has no name!");
    spaceTO.name && (this.viewModel.name.Value = spaceTO.name);

    !spaceTO.description &&
      logger.warn("SpaceTO has an undefined description!");
    spaceTO.description &&
      (this.viewModel.description.Value = spaceTO.description);

    spaceTO.goals && (this.viewModel.goals.Value = spaceTO.goals);

    !spaceTO.elements && logger.warn("SpaceTO has no elements!");
    spaceTO.elements &&
      (this.viewModel.elements.Value = spaceTO.elements.map((elementTO) => [
        elementTO.type as ElementTypeStrings,
        elementTO.name,
      ]));

    spaceTO.requiredPoints &&
      (this.viewModel.requiredPoints.Value = spaceTO.requiredPoints);

    // spaceTO.includedPoints && (this.viewModel.includedPoints.Value = spaceTO.includedPoints);

    spaceTO.requirements &&
      (this.viewModel.requirements.Value = spaceTO.requirements.map(
        (requirement) => [false, `TBD ${requirement}`]
      ));

    // Old code (Now content):
    // this.viewModel.content.Value = spaceTO.elements.map((elementTO) => [
    //   elementTO.elementData.type as ElementTypeStrings,
    //   elementTO.name,
    // ]);
  }
}
