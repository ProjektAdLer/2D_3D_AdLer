import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";

const viewModelMock = new StoryElementViewModel();
describe("StoryElementController", () => {
  let systemUnderTest: StoryElementController;
  test("closePanel sets isOpen in viewmodel to false", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.closePanel();
    expect(viewModelMock.isOpen.Value).toBeFalsy();
  });
  test("increasePageId increases pageId in viewmodel by 1", () => {
    viewModelMock.pageId.Value = 0;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.increasePageId();
    expect(viewModelMock.pageId.Value).toBe(1);
  });
  test("decreasePageId decreases pageId in viewmodel by 1", () => {
    viewModelMock.pageId.Value = 10;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.decreasePageId();
    expect(viewModelMock.pageId.Value).toBe(9);
  });
});
