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
  test("onIntroButtonClicked sets showOnlyIntro in viewmodel to true", () => {
    viewModelMock.showOnlyIntro.Value = false;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.onIntroButtonClicked();
    expect(viewModelMock.showOnlyIntro.Value).toBeTruthy();
  });
  test("onOutroButtonClicked sets showOnlyOutro in viewmodel to true", () => {
    viewModelMock.showOnlyOutro.Value = false;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.onOutroButtonClicked();
    expect(viewModelMock.showOnlyOutro.Value).toBeTruthy();
  });
  test("backToMenuButtonClicked sets showOnlyIntro and showOnlyOutro in viewmodel to false", () => {
    viewModelMock.showOnlyIntro.Value = true;
    viewModelMock.showOnlyOutro.Value = true;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.backToMenuButtonClicked();
    expect(viewModelMock.showOnlyIntro.Value).toBeFalsy();
    expect(viewModelMock.showOnlyOutro.Value).toBeFalsy();
  });
});
