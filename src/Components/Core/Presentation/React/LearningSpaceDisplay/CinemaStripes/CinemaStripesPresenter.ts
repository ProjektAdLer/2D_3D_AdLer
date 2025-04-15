import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import ICinemaStripesPresenter from "./ICinemaStripesPresenter";
import CinemaStripesViewModel from "./CinemaStripesViewModel";
export default class CinemaStripesPresenter implements ICinemaStripesPresenter {
  constructor(private viewModel: CinemaStripesViewModel) {}

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.viewModel.isOpen.Value = true;
  }
  onStoryElementCutSceneFinished(): void {
    this.viewModel.isOpen.Value = false;
  }
}
