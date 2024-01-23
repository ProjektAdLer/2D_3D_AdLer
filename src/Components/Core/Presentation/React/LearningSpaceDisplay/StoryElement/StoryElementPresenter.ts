import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementViewModel from "./StoryElementViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default class StoryElementPresenter implements IStoryElementPresenter {
  constructor(private viewModel: StoryElementViewModel) {}

  open(type: StoryElementType): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.type.Value = type;
  }

  // onStoryElementLoaded(storyElementTextTO: StoryElementTextTO): void {
  //   if (
  //     storyElementTextTO.introTexts &&
  //     storyElementTextTO.introTexts.length > 0 &&
  //     this.viewModel.type.Value === StoryElementType.Intro
  //   )
  //     this.viewModel.texts.Value = storyElementTextTO.introTexts;
  //   if (
  //     storyElementTextTO.outroTexts &&
  //     storyElementTextTO.outroTexts.length > 0 &&
  //     this.viewModel.type.Value === StoryElementType.Outro
  //   )
  //     this.viewModel.texts.Value = storyElementTextTO.outroTexts;
  // }
}
