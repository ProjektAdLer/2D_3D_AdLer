import StoryElementTO from "../../../../../Core/Application/DataTransferObjects/StoryElementTO";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import StoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementPresenter";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { LearningElementModelTypeEnums } from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

describe("StoryElementPresenter", () => {
  let systemUnderTest: StoryElementPresenter;
  let viewModel: StoryElementViewModel;

  beforeEach(() => {
    systemUnderTest = new StoryElementPresenter(new StoryElementViewModel());
    viewModel = systemUnderTest["viewModel"];
  });

  test("open sets isOpen true", () => {
    viewModel.isOpen.Value = false;

    systemUnderTest.open(StoryElementType.Intro);

    expect(viewModel.isOpen.Value).toBe(true);
  });

  test("open sets storyTypeToDisplay to given value when its not IntroOutro", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.None;

    systemUnderTest.open(StoryElementType.Intro);

    expect(viewModel.storyTypeToDisplay.Value).toBe(StoryElementType.Intro);
  });

  test("open sets storyTypeToDisplay to Intro when its IntroOutro and isIntroCutsceneRunning is true", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.None;
    viewModel.isIntroCutsceneRunning.Value = true;

    systemUnderTest.open(StoryElementType.IntroOutro);

    expect(viewModel.storyTypeToDisplay.Value).toBe(StoryElementType.Intro);
  });

  test("open sets storyTypeToDisplay to Intro when its IntroOutro and outro is not unlocked", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.None;
    viewModel.isOutroUnlocked.Value = false;

    systemUnderTest.open(StoryElementType.IntroOutro);

    expect(viewModel.storyTypeToDisplay.Value).toBe(StoryElementType.Intro);
  });

  test("open sets storyTypeToDisplay to Outro when its IntroOutro and isOutroCutsceneRunning is true", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.None;
    viewModel.isIntroCutsceneRunning.Value = false;
    viewModel.isOutroUnlocked.Value = true;
    viewModel.isOutroCutsceneRunning.Value = true;

    systemUnderTest.open(StoryElementType.IntroOutro);

    expect(viewModel.storyTypeToDisplay.Value).toBe(StoryElementType.Outro);
  });

  test("onStoryElementCutSceneTriggered sets isOutroUnlocked to true and isOutroCutsceneRunning to true when storyType is Outro", () => {
    viewModel.isOutroUnlocked.Value = false;
    viewModel.isOutroCutsceneRunning.Value = false;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Outro);

    expect(viewModel.isOutroUnlocked.Value).toBe(true);
    expect(viewModel.isOutroCutsceneRunning.Value).toBe(true);
  });

  test("onStoryElementCutSceneTriggered sets isIntroCutsceneRunning to true when storyType is Intro", () => {
    viewModel.isIntroCutsceneRunning.Value = false;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.isIntroCutsceneRunning.Value).toBe(true);
  });

  test("onLearningSpaceLoaded sets the correct values", () => {
    let storyElement: StoryElementTO[] = [
      {
        introStoryTexts: ["blabla111", "blabla222"],
        outroStoryTexts: ["blabla333"],
        modelType: null,
        storyType: StoryElementType.IntroOutro,
      },
    ];

    viewModel.introTexts.Value = ["nicht blabla"];
    viewModel.outroTexts.Value = ["nicht blabla"];

    systemUnderTest.onLearningSpaceLoaded({ storyElements: storyElement });

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
  });

  test("onLearningSpaceLoaded sets the correct values, with model types", () => {
    let mockedStoryElements: StoryElementTO[] = [
      {
        introStoryTexts: ["blabla111", "blabla222"],
        outroStoryTexts: ["blabla333"],
        modelType:
          LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
        storyType: StoryElementType.IntroOutro,
      },
    ];

    viewModel.introTexts.Value = ["nicht blabla"];
    viewModel.outroTexts.Value = ["nicht blabla"];

    systemUnderTest.onLearningSpaceLoaded({
      storyElements: mockedStoryElements,
    });

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
  });

  test("onLearningSpaceLoaded sets the correct values if no texts are given", () => {
    let mockedStoryElements: StoryElementTO[] = [
      {
        introStoryTexts: [],
        outroStoryTexts: null,
        modelType:
          LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
        storyType: StoryElementType.IntroOutro,
      },
    ];

    viewModel.introTexts.Value = ["nicht blabla"];
    viewModel.outroTexts.Value = ["nicht blabla"];

    systemUnderTest.onLearningSpaceLoaded({
      storyElements: mockedStoryElements,
    });

    expect(viewModel.introTexts.Value).toStrictEqual(["Kein Text vorhanden."]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["Kein Text vorhanden."]);
  });
});
