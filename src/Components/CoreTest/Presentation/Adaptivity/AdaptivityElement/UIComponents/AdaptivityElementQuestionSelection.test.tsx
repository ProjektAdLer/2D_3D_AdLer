import { render } from "@testing-library/react";
import AdaptivityElementQuestionSelection from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementQuestionSelection";
import React from "react";
import { AdaptivityElementActionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

describe("AdaptivityElementQuestionSelection", () => {
  // ANF-ID: [EWE0012]
  test("should render (with all difficulties)", () => {
    const { container } = render(
      <AdaptivityElementQuestionSelection
        selectedTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isRequired: false,
          isCompleted: false,
          requiredDifficulty: 0,
          questions: [
            {
              questionID: 0,
              questionText: "testQuestionText",
              isMultipleChoice: false,
              difficulty: 0,
              isCompleted: null,
              isRequired: false,
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
                  showOnIsWrong: true,
                  hintAction: {
                    hintActionData: "testHintActionData",
                    hintActionType: AdaptivityElementActionTypes.CommentAction,
                  },
                },
              ],
            },
            {
              questionID: 0,
              questionText: "testQuestionText",
              isMultipleChoice: false,
              difficulty: 100,
              isCompleted: true,
              isRequired: false,
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
                  showOnIsWrong: false,
                  hintAction: {
                    hintActionData: "testHintActionData",
                    hintActionType: AdaptivityElementActionTypes.CommentAction,
                  },
                },
              ],
            },
            {
              questionID: 0,
              questionText: "testQuestionText",
              isMultipleChoice: false,
              difficulty: 200,
              isCompleted: false,
              isRequired: false,
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
                  showOnIsWrong: true,
                  hintAction: {
                    hintActionData: "testHintActionData",
                    hintActionType: AdaptivityElementActionTypes.CommentAction,
                  },
                },
              ],
            },
          ],
        }}
        setHeaderText={() => {}}
        onSelectQuestion={() => {}}
        onSelectHint={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render (every required combination)", () => {
    const { container } = render(
      <AdaptivityElementQuestionSelection
        selectedTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isRequired: true,
          isCompleted: false,
          requiredDifficulty: 0,
          questions: [
            {
              questionID: 0,
              questionText: "testQuestionText",
              isMultipleChoice: false,
              difficulty: 100,
              isCompleted: true,
              isRequired: true,
              questionAnswers: [
                {
                  answerIndex: 0,
                  answerText: "testAnswerText",
                  isSelected: false,
                },
              ],
              hints: [],
            },
            {
              questionID: 0,
              questionText: "testQuestionText",
              isMultipleChoice: false,
              difficulty: 200,
              isCompleted: false,
              isRequired: true,
              questionAnswers: [
                {
                  answerIndex: 0,
                  answerText: "testAnswerText",
                  isSelected: false,
                },
              ],
              hints: [],
            },
          ],
        }}
        setHeaderText={() => {}}
        onSelectQuestion={() => {}}
        onSelectHint={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("onSelectQuestion button calls onSelectQuestion callback when clicked", () => {
    const onSelectQuestionMock = jest.fn();
    const question = {
      questionID: 42,
      questionText: "testQuestionText",
      isMultipleChoice: false,
      difficulty: 0,
      isCompleted: false,
      isRequired: false,
      questionAnswers: [
        {
          answerIndex: 0,
          answerText: "testAnswerText",
          isSelected: false,
        },
      ],
      hints: [],
    };
    const { getByText } = render(
      <AdaptivityElementQuestionSelection
        selectedTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          requiredDifficulty: 0,
          questions: [question],
        }}
        setHeaderText={() => {}}
        onSelectQuestion={onSelectQuestionMock}
        onSelectHint={() => {}}
      />,
    );
    getByText("easy").click();

    expect(onSelectQuestionMock).toHaveBeenCalledTimes(1);
    expect(onSelectQuestionMock).toHaveBeenCalledWith(question);
  });

  // ANF-ID: [EWE0010]
  test("onSelectHint button calls onSelectHint callback when clicked", () => {
    const onSelectHintMock = jest.fn();
    const hint = {
      hintID: 0,
      showOnIsWrong: true,
      hintAction: {
        hintActionData: "testHintActionData",
        hintActionType: AdaptivityElementActionTypes.CommentAction,
      },
    };
    const question = {
      questionID: 42,
      questionText: "testQuestionText",
      isMultipleChoice: false,
      difficulty: 0,
      isCompleted: false,
      isRequired: false,
      questionAnswers: [
        {
          answerIndex: 0,
          answerText: "testAnswerText",
          isSelected: false,
        },
      ],
      hints: [hint],
    };
    const { getByText } = render(
      <AdaptivityElementQuestionSelection
        selectedTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          requiredDifficulty: 0,
          questions: [question],
        }}
        setHeaderText={() => {}}
        onSelectQuestion={() => {}}
        onSelectHint={onSelectHintMock}
      />,
    );
    getByText("hintButton").click();

    expect(onSelectHintMock).toHaveBeenCalledTimes(1);
    expect(onSelectHintMock).toHaveBeenCalledWith(hint, question);
  });
});
