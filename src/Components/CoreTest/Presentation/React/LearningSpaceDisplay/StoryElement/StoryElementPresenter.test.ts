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

  test("open sets the correct values", () => {
    viewModel.isOpen.Value = false;
    viewModel.pageId.Value = 1;
    viewModel.showOnlyIntro.Value = true;
    viewModel.showOnlyOutro.Value = true;

    systemUnderTest.open(StoryElementType.Intro);

    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.pageId.Value).toBe(0);
    expect(viewModel.showOnlyIntro.Value).toBe(false);
    expect(viewModel.showOnlyOutro.Value).toBe(false);
  });

  test("open sets the correct values, when split stories present", () => {
    viewModel.isOpen.Value = false;
    viewModel.pageId.Value = 1;
    viewModel.showOnlyIntro.Value = true;
    viewModel.showOnlyOutro.Value = true;
    viewModel.isSplitStory.Value = true;

    systemUnderTest.open(StoryElementType.Intro);

    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.pageId.Value).toBe(0);
    expect(viewModel.showOnlyIntro.Value).toBe(false);
    expect(viewModel.showOnlyOutro.Value).toBe(false);
    expect(viewModel.pickedStory.Value).toBe(StoryElementType.Intro);
  });

  test("onStoryElementCutSceneTriggered sets the correct values, if the type is outro", () => {
    viewModel.pageId.Value = 1;
    viewModel.outroJustNowUnlocked.Value = false;
    viewModel.outroUnlocked.Value = false;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Outro);

    expect(viewModel.pageId.Value).toBe(0);
    expect(viewModel.outroJustNowUnlocked.Value).toBe(true);
    expect(viewModel.outroUnlocked.Value).toBe(true);
  });

  test("onStoryElementCutSceneTriggered sets no values, if the type is not outro", () => {
    viewModel.pageId.Value = 1;
    viewModel.outroJustNowUnlocked.Value = false;
    viewModel.outroUnlocked.Value = false;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.pageId.Value).toBe(1);
    expect(viewModel.outroJustNowUnlocked.Value).toBe(false);
    expect(viewModel.outroUnlocked.Value).toBe(false);
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
    viewModel.type.Value = [StoryElementType.None];

    systemUnderTest.onLearningSpaceLoaded({ storyElements: storyElement });

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
    expect(viewModel.type.Value).toStrictEqual([StoryElementType.IntroOutro]);
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
    viewModel.type.Value = [StoryElementType.None];

    systemUnderTest.onLearningSpaceLoaded({
      storyElements: mockedStoryElements,
    });

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
    expect(viewModel.type.Value).toStrictEqual([StoryElementType.IntroOutro]);
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
    viewModel.type.Value = [StoryElementType.None];

    systemUnderTest.onLearningSpaceLoaded({
      storyElements: mockedStoryElements,
    });

    expect(viewModel.introTexts.Value).toStrictEqual(["Kein Text vorhanden."]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["Kein Text vorhanden."]);
    expect(viewModel.type.Value).toStrictEqual([StoryElementType.IntroOutro]);
  });
});
