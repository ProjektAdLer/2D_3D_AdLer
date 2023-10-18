import { render } from "@testing-library/react";
import React from "react";
import AdaptivityElementDialogContainer from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementDialogContainer";
import useBuilderMock from "../../../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
} from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import { mock } from "jest-mock-extended";
import IAdaptivityElementController from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/IAdaptivityElementController";
import { AdaptivityElementActionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

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

  test("should render", () => {
    viewModel.isOpen.Value = true;
    const content: AdaptivityElementContent = {
      elementName: "testName",
      introText: "testIntroText",
      tasks: [
        {
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          requiredDifficulty: 0,
          questions: [
            {
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
            },
          ],
        },
      ],
    };
    viewModel.contentData.Value = content;
    viewModel.currentTaskID.Value = 0;
    viewModel.currentQuestionID.Value = 0;

    const { container } = render(<AdaptivityElementDialogContainer />);
    expect(container).toMatchSnapshot();
  });
});
