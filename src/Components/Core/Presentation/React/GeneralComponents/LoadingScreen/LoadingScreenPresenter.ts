import LoadingScreenViewModel from "./LoadingScreenViewModel";
import ILoadingScreenPresenter from "./ILoadingScreenPresenter";
import { injectable } from "inversify";

@injectable()
export default class LoadingScreenPresenter implements ILoadingScreenPresenter {
  constructor(private viewModel: LoadingScreenViewModel) {}
  showLoadingScreen() {
    this.viewModel.isOpen.Value = true;
    this.viewModel.loadStep.Value = "";
  }
  releaseLoadingLock() {
    this.viewModel.isReadyToBeClosed.Value = true;
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
