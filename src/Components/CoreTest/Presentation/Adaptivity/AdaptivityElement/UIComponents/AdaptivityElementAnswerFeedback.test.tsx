import { render } from "@testing-library/react";
import React from "react";
import AdaptivityElementAnswerFeedback from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementAnswerFeedback";

describe("AdaptivityElementAnswerFeedback", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={false}
        currentQuestion={{
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
          hints: [],
        }}
        currentTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          hasBeenCompleted: false,
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
              hints: [],
            },
          ],
        }}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
