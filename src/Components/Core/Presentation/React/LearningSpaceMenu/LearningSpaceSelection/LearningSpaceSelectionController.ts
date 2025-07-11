import ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ILearningSpaceSelectionController from "./ILearningSpaceSelectionController";
import LearningSpaceSelectionViewModel from "./LearningSpaceSelectionViewModel";
import history from "history/browser";
import bind from "bind-decorator";

export default class LearningSpaceSelectionController
  implements ILearningSpaceSelectionController
{
  private loadLearningSpaceUseCase: ILoadLearningSpaceUseCase;

  constructor(private viewModel: LearningSpaceSelectionViewModel) {
    this.loadLearningSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadLearningSpaceUseCase,
    );
  }

  onLearningSpaceClicked(spaceID: number): void {
    this.viewModel.selectedSpaceID.Value = spaceID;
    this.loadLearningSpaceUseCase.executeAsync({
      spaceID: spaceID,
      worldID: this.viewModel.worldID.Value,
    });
  }

  @bind
  onLearningSpaceDoubleClicked(spaceID: number): void {
    history.push("/spacedisplay/" + spaceID);
  }
}
