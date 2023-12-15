import StoryElementTextTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTextTO";
import IIntroStoryElementPresenter from "./IIntroStoryElementPresenter";
import IntroStoryElementViewModel from "./IntroStoryElementViewModel";

export default class IntroStoryElementPresenter
  implements IIntroStoryElementPresenter
{
  constructor(private viewModel: IntroStoryElementViewModel) {}

  open(): void {
    this.viewModel.isOpen.Value = true;
  }

  onStoryElementLoaded(storyElementTextTO: StoryElementTextTO): void {
    if (storyElementTextTO.introTexte)
      this.viewModel.texts.Value = storyElementTextTO.introTexte;
  }
}
