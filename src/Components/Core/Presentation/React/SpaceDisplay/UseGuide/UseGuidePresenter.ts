import IUseGuidePresenter from "./IUseGuidePresenter";
import UseGuideViewModel from "./UseGuideViewModel";

export default class UseGuidePresenter implements IUseGuidePresenter {
  constructor(private viewModel: UseGuideViewModel) {}
}
