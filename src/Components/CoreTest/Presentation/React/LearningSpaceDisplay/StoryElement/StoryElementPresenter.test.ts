import StoryElementTextTO from "../../../../../Core/Application/DataTransferObjects/StoryElementTextTO";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementPresenter";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";

describe("StoryElementPresenter", () => {
  let systemUnderTest: StoryElementPresenter;
  let viewModel: StoryElementViewModel;

  beforeEach(() => {
    systemUnderTest = new StoryElementPresenter(new StoryElementViewModel());
    viewModel = systemUnderTest["viewModel"];
  });

  test("openStoryElement (intro) sets isOpen to true and type to intro", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.open(StoryElementType.Intro);
    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.type.Value).toBe(StoryElementType.Intro);
  });
  test("openStoryElement (outro) sets isOpen to true and type to outro", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.open(StoryElementType.Outro);
    expect(viewModel.isOpen.Value).toBe(true);
    expect(viewModel.type.Value).toBe(StoryElementType.Outro);
  });
  test("onStoryElementLoaded sets texts in viewmodel", () => {
    let storyElementText: StoryElementTextTO = {
      introTexts: ["blabla111"],
      outroTexts: ["blabla222"],
    };
    systemUnderTest.onStoryElementLoaded(storyElementText);
    expect(viewModel.introTexts.Value).toStrictEqual(["blabla111"]);
    expect(viewModel.outroTexts.Value).toStrictEqual(["blabla222"]);
  });
  test("onStoryElementLoaded sets nothing in intro if no text is given by port", () => {
    let storyElementText: StoryElementTextTO = {
      introTexts: [],
      outroTexts: ["blabla222"],
    };
    viewModel.introTexts.Value = ["nicht blabla"];
    systemUnderTest.onStoryElementLoaded(storyElementText);
    expect(viewModel.introTexts.Value).toStrictEqual(["nicht blabla"]);
  });
  test("onStoryElementLoaded sets nothing in outro if no text is given by port", () => {
    let storyElementText: StoryElementTextTO = {
      introTexts: [],
      outroTexts: [],
    };
    viewModel.outroTexts.Value = ["nicht blabla"];
    systemUnderTest.onStoryElementLoaded(storyElementText);
    expect(viewModel.outroTexts.Value).toStrictEqual(["nicht blabla"]);
  });
});
