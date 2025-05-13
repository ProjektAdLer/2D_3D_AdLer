import { LearningElementModel } from "./../../../../Domain/LearningElementModels/LearningElementModelTypes";
import bind from "bind-decorator";
import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementViewModel from "./StoryElementViewModel";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import Observable from "src/Lib/Observable";
import { EmotionType } from "src/Components/Core/Domain/Types/EmotionTypes";

export default class StoryElementPresenter implements IStoryElementPresenter {
  constructor(private viewModel: StoryElementViewModel) {}

  @bind
  open(type: StoryElementType): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.storyTypeToDisplay.Value = type;

    if (type === StoryElementType.IntroOutro) {
      if (
        this.viewModel.isIntroCutsceneRunning.Value ||
        !this.viewModel.isOutroUnlocked.Value
      )
        this.viewModel.storyTypeToDisplay.Value = StoryElementType.Intro;
      else if (this.viewModel.isOutroCutsceneRunning.Value)
        this.viewModel.storyTypeToDisplay.Value = StoryElementType.Outro;
    }
  }

  @bind
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    if (storyType === StoryElementType.Outro) {
      this.viewModel.isOutroUnlocked.Value = true;
      this.viewModel.isOutroCutsceneRunning.Value = true;
    } else if (storyType === StoryElementType.Intro) {
      this.viewModel.isIntroCutsceneRunning.Value = true;
    }
  }

  @bind
  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.viewModel.introTexts.Value = [];
    this.viewModel.outroTexts.Value = [];

    this.viewModel.isOutroUnlocked.Value = false;
    this.viewModel.isOutroCutsceneRunning.Value = false;
    this.viewModel.isIntroCutsceneRunning.Value = false;

    this.viewModel.introModelType = new Observable<LearningElementModel>();
    this.viewModel.introModelName = new Observable<string | null>();
    this.viewModel.outroModelType = new Observable<LearningElementModel>();
    this.viewModel.outroModelName = new Observable<string | null>();
    this.viewModel.storyTypeToDisplay.Value = StoryElementType.None;

    this.viewModel.isOutroUnlocked.Value =
      learningSpaceTO.currentScore >= learningSpaceTO.requiredScore;

    for (let i = 0; i < learningSpaceTO.storyElements.length; i++) {
      if (
        (learningSpaceTO.storyElements[i].storyType &
          StoryElementType.Intro) ===
        StoryElementType.Intro
      ) {
        if (
          learningSpaceTO.storyElements[i].introStoryTexts &&
          learningSpaceTO.storyElements[i].introStoryTexts?.length !== 0
        ) {
          this.viewModel.introTexts.Value =
            learningSpaceTO.storyElements[i].introStoryTexts!;
        } else {
          this.viewModel.introTexts.Value = ["Kein Text vorhanden."];
        }
        this.viewModel.introModelType.Value =
          learningSpaceTO.storyElements[i].modelType!;
        this.viewModel.introEmotion.Value =
          learningSpaceTO.storyElements[i].introEmotion ?? EmotionType.welcome;
        this.viewModel.introModelName.Value =
          learningSpaceTO.storyElements[i].storyNpcName ?? null;
      }
      if (
        (learningSpaceTO.storyElements[i].storyType &
          StoryElementType.Outro) ===
        StoryElementType.Outro
      ) {
        if (
          learningSpaceTO.storyElements[i].outroStoryTexts &&
          learningSpaceTO.storyElements[i].outroStoryTexts?.length !== 0
        ) {
          this.viewModel.outroTexts.Value =
            learningSpaceTO.storyElements[i].outroStoryTexts!;
        } else {
          this.viewModel.outroTexts.Value = ["Kein Text vorhanden."];
        }
        this.viewModel.outroModelType.Value =
          learningSpaceTO.storyElements[i].modelType!;
        this.viewModel.outroEmotion.Value =
          learningSpaceTO.storyElements[i].outroEmotion ?? EmotionType.welcome;
        this.viewModel.outroModelName.Value =
          learningSpaceTO.storyElements[i].storyNpcName ?? null;
      }
    }
  }
}
