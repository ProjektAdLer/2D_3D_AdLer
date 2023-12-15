import bind from "bind-decorator";
import IIntroStoryElementController from "./IIntroStoryElementController";
import IntroStoryElementViewModel from "./IntroStoryElementViewModel";

export default class IntroStoryElementController
  implements IIntroStoryElementController
{
  constructor(private viewModel: IntroStoryElementViewModel) {}

  @bind
  closePanel(): void {
    this.viewModel.isOpen.Value = false;
  }
}
