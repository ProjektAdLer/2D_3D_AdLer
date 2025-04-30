import { GradingStyle } from "./../../../../../Core/Domain/Types/GradingStyle";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import ProgressScorePanlViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgessScorePanelViewModel";
import ProgressscorepanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgressScorePanelPresenter";
import PointBasedDisplay from "../../../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";
import RequirementBasedDisplay from "../../../../../Core/Presentation/Utils/ElementCompletionDisplay/RequirementBasedDisplay";

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
      gradingStyle: new PointBasedDisplay(),
    };

    systemUnderTest.onLearningWorldEntityLoaded(learningWorldTO);
    expect(viewModel.gradingStyle).toEqual(GradingStyle.point);
  });

  test("onLearningWorldEntityLoaded sets point-based strategy", () => {
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
      gradingStyle: new PointBasedDisplay(),
    };

    systemUnderTest.onLearningWorldEntityLoaded(learningWorldTO);
    expect(viewModel.gradingStyle).toEqual(GradingStyle.point);
  });

  test("onLearningWorldEntityLoaded sets point-based strategy", () => {
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
      gradingStyle: new RequirementBasedDisplay(),
    };

    systemUnderTest.onLearningWorldEntityLoaded(learningWorldTO);
    expect(viewModel.gradingStyle).toEqual(GradingStyle.requirement);
  });
});
