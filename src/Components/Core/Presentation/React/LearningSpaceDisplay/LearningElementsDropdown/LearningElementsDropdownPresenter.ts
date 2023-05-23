import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import ILearningElementsDropdownPresenter from "./ILearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default class LearningElementsDropdownPresenter
  implements ILearningElementsDropdownPresenter
{
  constructor(private viewModel: LearningElementsDropdownViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    // filter out null elements because of empty slots
    const { filteredElements, elementNames } = spaceTO.elements.reduce(
      (results, element) => {
        if (!element) return results;

        results.filteredElements.push(element);
        results.elementNames.push(element.name);

        return results;
      },
      { filteredElements: [], elementNames: [] } as {
        filteredElements: LearningElementTO[];
        elementNames: string[];
      }
    );

    this.viewModel.elementNames.Value = elementNames;
    this.viewModel.elements.Value = filteredElements;
  }
}
