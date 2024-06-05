import { render, waitFor } from "@testing-library/react";
import React from "react";
import AdaptivityElementAnswerFeedback from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementAnswerFeedback";
import { AdaptivityQuestion } from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";

const easyQuestion: AdaptivityQuestion = {
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
};
const middleQuestion: AdaptivityQuestion = {
  questionID: 1,
  questionText: "testQuestionText",
  isMultipleChoice: false,
  difficulty: 100,
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
const hardQuestion: AdaptivityQuestion = {
  questionID: 2,
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
};

describe("AdaptivityElementAnswerFeedback", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={false}
        currentQuestion={easyQuestion}
        currentTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          hasBeenCompleted: false,
          requiredDifficulty: 0,
          questions: [easyQuestion],
        }}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EWE0016]
  test("answering a question correctly and there exists a more difficult question then a more difficult question will be recommended", () => {
    const container = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={true}
        currentQuestion={easyQuestion}
        currentTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          hasBeenCompleted: false,
          requiredDifficulty: 0,
          questions: [easyQuestion, middleQuestion, hardQuestion],
        }}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    waitFor(() => {
      expect(
        container.getByText(
          "questionSolvedWithHigherDifficultyQuestionAvailable"
        )
      ).toBeInTheDocument();
    });
  });

  test("answering a question correctly and there exists no question that is more difficult then no more difficult question will be recommended", () => {
    const container = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={true}
        currentQuestion={middleQuestion}
        currentTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          hasBeenCompleted: false,
          requiredDifficulty: 0,
          questions: [easyQuestion, middleQuestion],
        }}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    waitFor(() => {
      expect(
        container.getByText(
          "questionSolvedWithHigherDifficultyQuestionAvailable"
        )
      ).not.toBeInTheDocument();
    });
  });

  // ANF-ID: [EWE0016]
  test("answering a question incorrectly and there exists a less difficult question then a less difficult question will be recommended", () => {
    const container = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={false}
        currentQuestion={middleQuestion}
        currentTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          hasBeenCompleted: false,
          requiredDifficulty: 0,
          questions: [easyQuestion, middleQuestion, hardQuestion],
        }}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    waitFor(() => {
      expect(
        container.getByText(
          "questionSolvedWithLowerDifficultyQuestionAvailable"
        )
      ).toBeInTheDocument();
    });
  });

  test("answering a question incorrectly and there exists no less difficult question then no less question will be recommended", () => {
    const container = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={false}
        currentQuestion={middleQuestion}
        currentTask={{
          taskID: 0,
          taskTitle: "testTaskTitle",
          isCompleted: false,
          isRequired: false,
          hasBeenCompleted: false,
          requiredDifficulty: 0,
          questions: [middleQuestion, hardQuestion],
        }}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    waitFor(() => {
      expect(
        container.getByText(
          "questionSolvedWithLowerDifficultyQuestionAvailable"
        )
      ).not.toBeInTheDocument();
    });
  });
});
