import UserLearningWorldsInfoTO from "../../../../../../Components/Core/Application/DataTransferObjects/UserLearningWorldsInfoTO";
import Observable from "../../../../../../Lib/Observable";
import ReturnHomeModalPresenter from "../../../../../Core/Presentation/React/LearningWorldMenu/ReturnHomeModal/ReturnHomeModalPresenter";
import ReturnHomeModalViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/ReturnHomeModal/ReturnHomeModalViewModel";

describe("ReturnHomeModalPresenter", () => {
  let systemUnderTest: ReturnHomeModalPresenter;

  beforeEach(() => {
    systemUnderTest = new ReturnHomeModalPresenter(
      new ReturnHomeModalViewModel()
    );
  });

  test("onUserInitialLearningWorldsInfoLoaded should set viewModel data", () => {
    systemUnderTest["viewModel"].isNoWorldAvailable = new Observable<boolean>(
      false
    );
    systemUnderTest.onUserInitialLearningWorldsInfoLoaded({
      lastVisitedWorldID: undefined,
      worldInfo: [],
    } as UserLearningWorldsInfoTO);

    expect(systemUnderTest["viewModel"].isNoWorldAvailable.Value).toBe(true);
  });
});
