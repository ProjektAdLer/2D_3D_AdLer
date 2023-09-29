import { render } from "@testing-library/react";
import AdaptivityElementTaskSelection from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementTaskSelection";
import React from "react";

describe("AdaptivityElementTaskSelection", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementTaskSelection
        tasks={[
          {
            taskID: 0,
            taskTitle: "testTaskTitle",
            isCompleted: false,
            requiredDifficulty: 0,
            questions: [
              {
                questionID: 0,
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
              },
            ],
          },
        ]}
        setHeaderText={() => {}}
        onSelectTask={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test("task button calls onSelectTask callback when clicked", () => {
    const onSelectTaskMock = jest.fn();
    const { getByText } = render(
      <AdaptivityElementTaskSelection
        tasks={[
          {
            taskID: 42,
            taskTitle: "testTaskTitle",
            isCompleted: false,
            requiredDifficulty: 0,
            questions: [
              {
                questionID: 0,
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
              },
            ],
          },
        ]}
        setHeaderText={() => {}}
        onSelectTask={onSelectTaskMock}
      />
    );

    getByText("testTaskTitle").click();

    expect(onSelectTaskMock).toHaveBeenCalledTimes(1);
    expect(onSelectTaskMock).toHaveBeenCalledWith(42);
  });
});
