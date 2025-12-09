import history from "~ReactEntryPoint/history";
import LearningSpaceDetailController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailController";
import LearningSpaceDetailViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailViewModel";

const mockHistoryPush = jest.spyOn(history, "push");

const vm = new LearningSpaceDetailViewModel();

describe("LearningSpaceDetailController", () => {
  let systemUnderTest: LearningSpaceDetailController;

  beforeEach(() => {
    systemUnderTest = new LearningSpaceDetailController(vm);
  });

  test("onLearningSpaceButtonClicked calls history.push", () => {
    systemUnderTest.onLearningSpaceButtonClicked();
    expect(mockHistoryPush).toBeCalled();
  });
});
