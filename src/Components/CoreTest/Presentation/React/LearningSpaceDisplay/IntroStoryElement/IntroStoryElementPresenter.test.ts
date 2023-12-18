import IntroStoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementController";
import IntroStoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementPresenter";
import IntroStoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementViewModel";

describe("IntroStoryElementPresenter", () => {
  let systemUnderTest: IntroStoryElementPresenter;
  let viewModel: IntroStoryElementViewModel;

  beforeEach(() => {
    systemUnderTest = new IntroStoryElementPresenter(
      new IntroStoryElementViewModel()
    );
    viewModel = systemUnderTest["viewModel"];
  });

  test("openIntroStoryElement sets isOpen to true", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.open();
    expect(viewModel.isOpen.Value).toBe(true);
  });
  test("onStoryElementLoaded sets texts in viewmodel", () => {
    let storyElementText = { introTexte: "blablabla" };
    systemUnderTest.onStoryElementLoaded(storyElementText);
    expect(viewModel.texts.Value).toBe("blablabla");
  });
  test("onStoryElementLoaded sets nothing if no text is given by port", () => {
    let storyElementText = { outroTexte: "blablabla" };
    viewModel.texts.Value = ["blablabla"];
    systemUnderTest.onStoryElementLoaded(storyElementText);
    expect(viewModel.texts.Value).toStrictEqual(["blablabla"]);
  });
});
