import StoryElementTO from "../../../../../Core/Application/DataTransferObjects/StoryElementTO";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import StoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementPresenter";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";

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

    systemUnderTest.open();

    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.pageId.Value).toBe(0);
    expect(viewModel.showOnlyIntro.Value).toBe(false);
    expect(viewModel.showOnlyOutro.Value).toBe(false);
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

  test("onStoryElementLoaded sets the correct values", () => {
    let storyElementText: StoryElementTO = {
      introStoryTexts: ["blabla111", "blabla222"],
      outroStoryTexts: ["blabla333"],
      modelType: null,
      storyType: StoryElementType.Intro,
    };
    viewModel.introTexts.Value = ["nicht blabla"];
    viewModel.outroTexts.Value = ["nicht blabla"];
    viewModel.type.Value = StoryElementType.None;

    systemUnderTest.onStoryElementLoaded(storyElementText);

    expect(viewModel.introTexts.Value).toStrictEqual([
      "blabla111",
      "blabla222",
    ]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla333"]);
    expect(viewModel.type.Value).toBe(StoryElementType.Intro);
  });
});
