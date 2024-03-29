import { render } from "@testing-library/react";
import AdaptivityElementTaskSelection, {
  getAdaptivityQuestionStarState,
} from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementTaskSelection";
import React from "react";
import { AdaptivityElementDifficultyStarState } from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementDifficultyStars";

describe("AdaptivityElementTaskSelection", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementTaskSelection
        tasks={[
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
                difficulty: 0,
                isCompleted: false,
                isRequired: false,
                hints: [],
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
    const task = {
      taskID: 42,
      taskTitle: "testTaskTitle",
      isCompleted: false,
      isRequired: false,
      requiredDifficulty: 0,
      questions: [
        {
          questionID: 0,
          questionText: "testQuestionText",
          isMultipleChoice: false,
          difficulty: 0,
          isCompleted: false,
          isRequired: false,
          hints: [],
          questionAnswers: [
            {
              answerIndex: 0,
              answerText: "testAnswerText",
              isSelected: false,
            },
          ],
        },
      ],
    };
    const { getByText } = render(
      <AdaptivityElementTaskSelection
        tasks={[task]}
        setHeaderText={() => {}}
        onSelectTask={onSelectTaskMock}
      />
    );

    getByText("testTaskTitle").click();

    expect(onSelectTaskMock).toHaveBeenCalledTimes(1);
    expect(onSelectTaskMock).toHaveBeenCalledWith(task);
  });

  test("getAdaptivityQuestionStarState returns state Empty for undefined question", () => {
    expect(getAdaptivityQuestionStarState(undefined)).toBe(
      AdaptivityElementDifficultyStarState.Empty
    );
  });

  // ANF-ID: [EWE0011]
  test.each([
    {
      isRequired: true,
      isCompleted: true,
      expected: AdaptivityElementDifficultyStarState.RequiredSolved,
    },
    {
      isRequired: true,
      isCompleted: false,
      expected: AdaptivityElementDifficultyStarState.RequiredTried,
    },
    {
      isRequired: true,
      isCompleted: null,
      expected: AdaptivityElementDifficultyStarState.RequiredUnsolved,
    },
    {
      isRequired: false,
      isCompleted: true,
      expected: AdaptivityElementDifficultyStarState.NotRequiredSolved,
    },
    {
      isRequired: false,
      isCompleted: false,
      expected: AdaptivityElementDifficultyStarState.NotRequiredTried,
    },
    {
      isRequired: false,
      isCompleted: null,
      expected: AdaptivityElementDifficultyStarState.NotRequiredUnsolved,
    },
  ])(
    "getAdaptivityQuestionStarState returns state $expected for question with isRequired=$isRequired and isCompleted=$isCompleted",
    ({ isRequired, isCompleted, expected }) => {
      const result = getAdaptivityQuestionStarState({
        questionID: 0,
        questionText: "testQuestionText",
        isMultipleChoice: false,
        difficulty: 0,
        isCompleted,
        isRequired,
        hints: [],
        questionAnswers: [
          {
            answerIndex: 0,
            answerText: "testAnswerText",
            isSelected: false,
          },
        ],
      });

      expect(result).toBe(expected);
    }
  );
});
