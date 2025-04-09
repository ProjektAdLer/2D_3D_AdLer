import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import ProgressScorePanlViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgessScorePanelViewModel";
import ProgressscorepanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgressScorePanelPresenter";
import PointBasedDisplay from "../../../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";

describe("ProgressScorePanelPresenter", () => {
  let viewModel: ProgressScorePanlViewModel;
  let systemUnderTest: ProgressscorepanelPresenter;

  beforeEach(() => {
    viewModel = new ProgressScorePanlViewModel();
    systemUnderTest = new ProgressscorepanelPresenter(viewModel);
  });

  test("onLearningWorldEntityLoaded sets strategy", () => {
    const learningWorldTO: LearningWorldTO = {
      id: 0,
      name: "",
      spaces: [],
      goals: [],
      description: "",
      worldCompletionText: "",
      evaluationLink: "",
      completionModalShown: false,
      lastVisitedSpaceID: 1,
      displayStrategy: new PointBasedDisplay(),
    };

    systemUnderTest.onLearningWorldEntityLoaded(learningWorldTO);
    expect(viewModel.displayStrategy).toEqual("point-based");
  });

  test("onLearningWorldEntityLoaded sets default strategy", () => {
    const learningWorldTO: LearningWorldTO = {
      id: 0,
      name: "",
      spaces: [],
      goals: [],
      description: "",
      worldCompletionText: "",
      evaluationLink: "",
      completionModalShown: false,
      lastVisitedSpaceID: 1,
    };

    systemUnderTest.onLearningWorldEntityLoaded(learningWorldTO);
    expect(viewModel.displayStrategy).toEqual("point-based");
  });
});
