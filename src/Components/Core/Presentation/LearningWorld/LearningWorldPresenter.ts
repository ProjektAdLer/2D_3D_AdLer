import { inject, injectable } from "inversify";
import ILearningWorldPort, {
  LearningWorldTO,
} from "../../Application/LoadWorld/ILearningWorldPort";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IViewModelProvider from "../ViewModelProvider/IViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

@injectable()
export default class LearningWorldPresenter implements ILearningWorldPort {
  private viewModel = new LearningWorldViewModel();

  constructor(
    @inject(CORE_TYPES.IViewModelProvider) private provider: IViewModelProvider
  ) {
    provider.registerViewModel<LearningWorldViewModel>(
      this.viewModel,
      LearningWorldViewModel
    );
  }

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    this.viewModel.id = learningWorldTO.id;
  }
}
