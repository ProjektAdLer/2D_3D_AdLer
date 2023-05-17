import LearningSpacePrecursorAndSuccessorTO from "src/Components/Core/Application/DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import ExitModalViewModel from "./ExitModalViewModel";
import IExitModalPresenter from "./IExitModalPresenter";

export default class ExitModalPresenter implements IExitModalPresenter {
  constructor(private viewModel: ExitModalViewModel) {}

  open(): void {
    this.viewModel.isOpen.Value = true;
  }

  onLearningSpacePrecursorAndSuccessorLoaded(
    LearningSpacePrecursorAndSuccessorTO: LearningSpacePrecursorAndSuccessorTO
  ): void {
    this.viewModel.precursorSpaces.Value =
      LearningSpacePrecursorAndSuccessorTO.precursorSpaces;
    this.viewModel.successorSpaces.Value =
      LearningSpacePrecursorAndSuccessorTO.successorSpaces;
    this.open();
  }
}
