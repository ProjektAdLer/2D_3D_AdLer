import ILearningWorldDetailController from "./ILearningWorldDetailController";
import history from "history/browser";
import LearningWorldDetailViewModel from "./LearningWorldDetailViewModel";
import bind from "bind-decorator";

export default class LearningWorldDetailController
  implements ILearningWorldDetailController
{
  constructor(private viewModel: LearningWorldDetailViewModel) {}

  @bind
  onEnterLearningWorldButtonClicked(): void {
    history.push("/spacemenu");
  }
}
