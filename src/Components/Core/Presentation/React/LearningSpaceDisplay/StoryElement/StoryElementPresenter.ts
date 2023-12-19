import StoryElementTextTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTextTO";
import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementViewModel from "./StoryElementViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default class StoryElementPresenter implements IStoryElementPresenter {
  constructor(private viewModel: StoryElementViewModel) {}

  open(type: StoryElementType): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.type.Value = type;
  }

  onStoryElementLoaded(storyElementTextTO: StoryElementTextTO): void {
    if (
      storyElementTextTO.introTexts &&
      storyElementTextTO.introTexts.length > 0
    )
      this.viewModel.introTexts.Value = storyElementTextTO.introTexts;
    if (
      storyElementTextTO.outroTexts &&
      storyElementTextTO.outroTexts.length > 0
    )
      this.viewModel.outroTexts.Value = storyElementTextTO.outroTexts;
  }
}
