import history from "history/browser";
import SpaceDetailController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailController";
import SpaceDetailViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailViewModel";

const mockHistoryPush = jest.spyOn(history, "push");

const vm = new SpaceDetailViewModel();

describe("SpaceDetailController", () => {
  let systemUnderTest: SpaceDetailController;

  beforeEach(() => {
    systemUnderTest = new SpaceDetailController(vm);
  });

  test("onSpaceButtonClicked calls history.push", () => {
    systemUnderTest.onSpaceButtonClicked();
    expect(mockHistoryPush).toBeCalled();
  });
});
