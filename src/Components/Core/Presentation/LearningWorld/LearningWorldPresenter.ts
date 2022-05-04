import { inject, injectable } from "inversify";
import ILearningWorldPort, {
  LearningWorldTO,
} from "../../Application/LoadWorld/ILearningWorldPort";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IViewModelProvider from "../ViewModelProvider/IViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

@injectable()
export default class LearningWorldPresenter implements ILearningWorldPort {
  private viewModel: LearningWorldViewModel;

  constructor(
    @inject(CORE_TYPES.IViewModelProvider)
    private viewModelProvider: IViewModelProvider
  ) {}

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    this.viewModel.worldName.setValue(learningWorldTO.worldName);
    this.viewModel.worldNameLoading.setValue(false);

    this.viewModel = new LearningWorldViewModel();

    this.viewModelProvider.registerViewModel<LearningWorldViewModel>(
      this.viewModel,
      LearningWorldViewModel
    );
  }
}
