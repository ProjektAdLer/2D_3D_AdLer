import { render } from "@testing-library/react";
import AdaptivityElementQuestionSelection from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementQuestionSelection";
import React from "react";

describe("AdaptivityElementQuestionSelection", () => {
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
              hints: [],
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
              hints: [],
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
              hints: [],
            },
          ],
        }}
        setHeaderText={() => {}}
        onSelectQuestion={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test("onSelectQuestion button calls onSelectQuestion callback when clicked", () => {
    const onSelectQuestionMock = jest.fn();
    const { getByText } = render(
      <AdaptivityElementQuestionSelection
        selectedTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          requiredDifficulty: 0,
          questions: [
            {
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
            },
          ],
        }}
        setHeaderText={() => {}}
        onSelectQuestion={onSelectQuestionMock}
      />
    );
    getByText("Leicht").click();

    expect(onSelectQuestionMock).toHaveBeenCalledTimes(1);
    expect(onSelectQuestionMock).toHaveBeenCalledWith(42);
  });
});
