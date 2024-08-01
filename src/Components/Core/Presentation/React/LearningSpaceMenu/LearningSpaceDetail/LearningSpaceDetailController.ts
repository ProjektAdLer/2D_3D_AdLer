import ILearningSpaceDetailController from "./ILearningSpaceDetailController";
import history from "history/browser";
import LearningSpaceDetailViewModel from "./LearningSpaceDetailViewModel";
import bind from "bind-decorator";

export default class LearningSpaceDetailController
  implements ILearningSpaceDetailController
{
  constructor(private viewModel: LearningSpaceDetailViewModel) {}

  @bind
  onLearningSpaceButtonClicked(): void {
    history.push("/spacedisplay/" + this.viewModel.id.Value);
  }
}
