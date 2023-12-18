import IntroStoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementController";
import IntroStoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementViewModel";

const viewModelMock = new IntroStoryElementViewModel();
describe("IntroStoryElementController", () => {
  let systemUnderTest: IntroStoryElementController;
  test("closePanel sets isOpen in viewmodel to false", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest = new IntroStoryElementController(viewModelMock);
    systemUnderTest.closePanel();
    expect(viewModelMock.isOpen.Value).toBeFalsy();
  });
});
