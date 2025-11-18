import LoadingScreenViewModel from "./LoadingScreenViewModel";
import ILoadingScreenPresenter from "./ILoadingScreenPresenter";
import { injectable } from "inversify";
import { CursorState } from "src/Components/Core/Domain/Types/CursorStateTypes";

@injectable()
export default class LoadingScreenPresenter implements ILoadingScreenPresenter {
  constructor(private viewModel: LoadingScreenViewModel) {}
  showLoadingScreen() {
    this.viewModel.isOpen.Value = true;
    this.viewModel.loadStep.Value = "";
    this.viewModel.cursorState.Value = CursorState.loading_start;
  }

  releaseLoadingLock() {
    this.viewModel.isReadyToBeClosed.Value = true;
    this.viewModel.cursorState.Value = CursorState.loading_end;
  }

  lockLoadingLock() {
    this.viewModel.isReadyToBeClosed.Value = false;
  }

  pushLoadStep(step: string) {
    this.viewModel.loadStep.Value = step;
  }

  closeLoadingScreen() {
    this.viewModel.isOpen.Value = false;
  }
}
