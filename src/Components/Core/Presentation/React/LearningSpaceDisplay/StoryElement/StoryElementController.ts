import bind from "bind-decorator";
import IStoryElementController from "./IStoryElementController";
import StoryElementViewModel from "./StoryElementViewModel";

export default class StoryElementController implements IStoryElementController {
  constructor(private viewModel: StoryElementViewModel) {}

  @bind
  closePanel(): void {
    this.viewModel.isOpen.Value = false;
  }
  @bind
  increasePageId(): void {
    this.viewModel.pageId.Value++;
  }
  @bind
  decreasePageId(): void {
    this.viewModel.pageId.Value--;
  }
}