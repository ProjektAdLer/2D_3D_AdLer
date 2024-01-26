import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import ISideBarPresenter from "./ISideBarPresenter";
import SideBarViewModel from "./SideBarViewModel";

export default class SideBarPresenter implements ISideBarPresenter {
  constructor(private viewModel: SideBarViewModel) {}

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.viewModel.isDisabled.Value = true;
  }

  onStoryElementCutSceneFinished(): void {
    this.viewModel.isDisabled.Value = false;
  }
}
