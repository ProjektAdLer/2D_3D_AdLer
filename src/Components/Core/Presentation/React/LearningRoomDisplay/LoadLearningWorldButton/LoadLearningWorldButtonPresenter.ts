import ILoadLearningWorldButtonPresenter from "./ILoadLearningWorldButtonPresenter";
import LoadLearningWorldButtonViewModel from "./LoadLearningWorldButtonViewModel";

export default class LoadLearningWorldButtonPresenter
  implements ILoadLearningWorldButtonPresenter
{
  constructor(private viewModel: LoadLearningWorldButtonViewModel) {}
}
