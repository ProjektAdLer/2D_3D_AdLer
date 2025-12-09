import history from "~ReactEntryPoint/history";
import LearningWorldDetailController from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailController";
import LearningWorldDetailViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailViewModel";

const mockHistoryPush = jest.spyOn(history, "push");

const vm = new LearningWorldDetailViewModel();

describe("WorldDetailController", () => {
  let systemUnderTest: LearningWorldDetailController;

  beforeEach(() => {
    systemUnderTest = new LearningWorldDetailController(vm);
  });

  test("onWorldButtonClicked calls history.push", () => {
    systemUnderTest.onEnterLearningWorldButtonClicked();
    expect(mockHistoryPush).toBeCalled();
  });
});
