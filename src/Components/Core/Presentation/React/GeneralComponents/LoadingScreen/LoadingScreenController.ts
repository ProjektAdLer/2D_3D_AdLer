import ILoadingScreenController from "./ILoadingScreenController";
import LoadingScreenViewModel from "./LoadingScreenViewModel";

export default class LoadingScreenController
  implements ILoadingScreenController
{
  constructor(private viewModel: LoadingScreenViewModel) {}
  closeLoadingScreen() {
    this.viewModel.isOpen.Value = false;
  }
}
