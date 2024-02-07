import StoryElementTO from "../../../../../Core/Application/DataTransferObjects/StoryElementTO";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import StoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementPresenter";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import {
  LearningElementModel,
  LearningElementModelTypeEnums,
} from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

describe("StoryElementPresenter", () => {
  let systemUnderTest: StoryElementPresenter;
  let viewModel: StoryElementViewModel;

  beforeEach(() => {
    systemUnderTest = new StoryElementPresenter(new StoryElementViewModel());
    viewModel = systemUnderTest["viewModel"];
  });

  test.skip("open sets the correct values", () => {
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
    viewModel.numberOfStories.Value = 2;

    systemUnderTest.open(StoryElementType.Intro);

    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.pageId.Value).toBe(0);
    expect(viewModel.showOnlyIntro.Value).toBe(false);
    expect(viewModel.showOnlyOutro.Value).toBe(false);
    expect(viewModel.pickedStory.Value).toBe(StoryElementType.Intro);
  });

  test("outroSequenceOpening sets the correct values", () => {
    viewModel.isOpen.Value = false;
    viewModel.pageId.Value = 1;
    viewModel.outroJustNowUnlocked.Value = false;
    viewModel.outroUnlocked.Value = false;

    systemUnderTest.openThroughOutroSequence();

    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.pageId.Value).toBe(0);
    expect(viewModel.outroJustNowUnlocked.Value).toBe(true);
    expect(viewModel.outroUnlocked.Value).toBe(true);
  });

  test("onLearningSpaceLoaded sets the correct values", () => {
    let storyElement: StoryElementTO[] = [
      {
        introStoryTexts: ["blabla111", "blabla222"],
        outroStoryTexts: ["blabla333"],
        modelType: null,
        storyType: StoryElementType.Intro,
      },
    ];
    let learningSpaceTO: LearningSpaceTO = {
      id: 1,
      name: "blabla",
      elements: [],
      description: "blabla",
      goals: [],
      requirementsString: "blabla",
      requirementsSyntaxTree: null,
      isAvailable: true,
      requiredScore: 1,
      currentScore: 1,
      maxScore: 1,
      template: null,
      theme: null,
      storyElements: storyElement,
    };

    viewModel.introTexts.Value = ["nicht blabla"];
    viewModel.outroTexts.Value = ["nicht blabla"];
    viewModel.type.Value = [StoryElementType.None];

    systemUnderTest.onLearningSpaceLoaded(learningSpaceTO);

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
    expect(viewModel.type.Value).toStrictEqual([StoryElementType.Intro]);
  });
  test("onLearningSpaceLoaded sets the correct values, with model types", () => {
    let storyElement: StoryElementTO[] = [
      {
        introStoryTexts: ["blabla111", "blabla222"],
        outroStoryTexts: ["blabla333"],
        modelType:
          LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
        storyType: StoryElementType.Intro,
      },
    ];
    let learningSpaceTO: LearningSpaceTO = {
      id: 1,
      name: "blabla",
      elements: [],
      description: "blabla",
      goals: [],
      requirementsString: "blabla",
      requirementsSyntaxTree: null,
      isAvailable: true,
      requiredScore: 1,
      currentScore: 0,
      maxScore: 1,
      template: null,
      theme: null,
      storyElements: storyElement,
    };

    viewModel.introTexts.Value = ["nicht blabla"];
    viewModel.outroTexts.Value = ["nicht blabla"];
    viewModel.type.Value = [StoryElementType.None];

    systemUnderTest.onLearningSpaceLoaded(learningSpaceTO);

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
    expect(viewModel.type.Value).toStrictEqual([StoryElementType.Intro]);
  });
});
