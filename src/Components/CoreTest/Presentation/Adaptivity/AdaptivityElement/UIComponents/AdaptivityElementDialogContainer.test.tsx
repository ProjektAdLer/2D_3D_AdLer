import { getAllByTestId, render, waitFor } from "@testing-library/react";
import React from "react";
import AdaptivityElementDialogContainer from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementDialogContainer";
import useBuilderMock from "../../../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
} from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import { mock } from "jest-mock-extended";
import IAdaptivityElementController from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/IAdaptivityElementController";
import { AdaptivityElementActionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import { LearningElementModelTypeEnums } from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

describe("AdaptivityElementDialogContainer", () => {
  let viewModel: AdaptivityElementViewModel;

  beforeEach(() => {
    viewModel = new AdaptivityElementViewModel();
    useBuilderMock([viewModel, mock<IAdaptivityElementController>()]);
  });

  test("doesn't render if viewModel is undefined", () => {
    useBuilderMock([undefined, undefined]);
    const { container } = render(<AdaptivityElementDialogContainer />);
    expect(container).toBeEmptyDOMElement();
  });

  test("doesn't render if controller is undefined", () => {
    useBuilderMock([viewModel, undefined]);
    const { container } = render(<AdaptivityElementDialogContainer />);
    expect(container).toBeEmptyDOMElement();
  });

  test("doesn't render if isOpen is false", () => {
    viewModel.isOpen.Value = false;

    const { container } = render(<AdaptivityElementDialogContainer />);
    expect(container).toBeEmptyDOMElement();
  });

  test("doesn't render if contentData is undefined", () => {
    viewModel.isOpen.Value = true;
    viewModel.contentData.Value = undefined;

    const { container } = render(<AdaptivityElementDialogContainer />);
    expect(container).toBeEmptyDOMElement();
  });

  // ANF-ID: [EWE0014]
  test("should render", () => {
    viewModel.isOpen.Value = true;
    viewModel.model.Value =
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard;
    const question = {
      questionID: 0,
      questionText: "testQuestionText",
      isMultipleChoice: false,
      isRequired: false,
      isCompleted: false,
      difficulty: 0,
      questionAnswers: [
        {
          answerIndex: 0,
          answerText: "testAnswerText",
          isSelected: false,
        },
      ],
      hints: [
        {
          hintID: 0,
          hintAction: {
            hintActionData: "testHintActionData",
            hintActionType: AdaptivityElementActionTypes.CommentAction,
          },
          showOnIsWrong: false,
        },
      ],
    };
    const task = {
      taskID: 0,
      taskTitle: "testTaskTitle",
      isCompleted: false,
      isRequired: false,
      hasBeenCompleted: false,
      requiredDifficulty: 0,
      questions: [question],
    };

    const content: AdaptivityElementContent = {
      elementName: "testName",
      introText: "testIntroText",
      tasks: [task],
    };
    viewModel.contentData.Value = content;
    viewModel.currentTask.Value = task;
    viewModel.currentQuestion.Value = question;

    const { container } = render(<AdaptivityElementDialogContainer />);
    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EWE0015]
  test.each([
    [LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC],
    [LearningElementModelTypeEnums.QuizElementModelTypes.CampusNPC],
    [LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC],
    [LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC],
  ])("displays correct npc thumbnail for model %p", (model) => {
    viewModel.isOpen.Value = true;
    viewModel.model.Value = model;
    const question = {
      questionID: 0,
      questionText: "testQuestionText",
      isMultipleChoice: false,
      isRequired: false,
      isCompleted: false,
      difficulty: 0,
      questionAnswers: [
        {
          answerIndex: 0,
          answerText: "testAnswerText",
          isSelected: false,
        },
      ],
      hints: [
        {
          hintID: 0,
          hintAction: {
            hintActionData: "testHintActionData",
            hintActionType: AdaptivityElementActionTypes.CommentAction,
          },
          showOnIsWrong: false,
        },
      ],
    };
    const task = {
      taskID: 0,
      taskTitle: "testTaskTitle",
      isCompleted: false,
      isRequired: false,
      hasBeenCompleted: false,
      requiredDifficulty: 0,
      questions: [question],
    };

    const content: AdaptivityElementContent = {
      elementName: "testName",
      introText: "testIntroText",
      tasks: [task],
    };
    viewModel.contentData.Value = content;
    viewModel.currentTask.Value = task;
    viewModel.currentQuestion.Value = question;

    const { container } = render(<AdaptivityElementDialogContainer />);

    const npcImages = getAllByTestId(container, "npcImage");

    expect(npcImages).toHaveLength(2);
    npcImages.forEach((npcImage) => {
      expect(npcImage).toBeInTheDocument();
      expect(npcImage).toMatchSnapshot();
    });
  });

  // ANF-ID: [EWE0019]
  test("click on legend-text calls showFooterTooltip", () => {
    const controllerMock = mock<IAdaptivityElementController>();

    const content: AdaptivityElementContent = {
      elementName: "testName",
      introText: "testIntroText",
      tasks: [],
    };
    viewModel.contentData.Value = content;
    viewModel.isOpen.Value = true;

    useBuilderMock([viewModel, controllerMock]);

    const { getByText } = render(<AdaptivityElementDialogContainer />);
    getByText("legendHover").click();
    expect(controllerMock.showFooterTooltip).toBeCalled();
  });

  // ANF-ID: [EWE0019]
  test("displays legend", () => {
    viewModel.showFooterTooltip.Value = true;
    const container = render(<AdaptivityElementDialogContainer />);

    waitFor(() => {
      expect(container.getByText("headerLegend")).toBeInTheDocument();
      expect(
        container.getByTestId("requiredTaskIconImage")
      ).toBeInTheDocument();
    });
  });
});
