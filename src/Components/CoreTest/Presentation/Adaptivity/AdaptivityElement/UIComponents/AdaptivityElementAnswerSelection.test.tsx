import { render } from "@testing-library/react";
import AdaptivityElementAnswerSelection from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementAnswerSelection";
import React from "react";

describe("AdaptivityElementAnswerSelection", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementAnswerSelection
        question={{
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
              isCorrect: false,
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EWE0008]
  test("submit button is deactive if no answer is selected if question is single choice", () => {
    const { getByText } = render(
      <AdaptivityElementAnswerSelection
        question={{
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
              isCorrect: false,
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />,
    );
    expect(getByText("submitAnswer").closest("button")).toBeDisabled();
  });

  // ANF-ID: [EWE0009]
  test("submit button is deactive if no answer is selected if question is multiple choice", () => {
    const { getByText } = render(
      <AdaptivityElementAnswerSelection
        question={{
          questionID: 0,
          questionText: "testQuestionText",
          isMultipleChoice: true,
          difficulty: 0,
          isCompleted: false,
          isRequired: false,
          questionAnswers: [
            {
              answerIndex: 0,
              answerText: "testAnswerText",
              isSelected: false,
              isCorrect: false,
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />,
    );
    expect(getByText("submitAnswers").closest("button")).toBeDisabled();
  });

  // ANF-ID: [EWE0008, EWE0009]
  test("click on submit button should call submitSelection", () => {
    const submitSelection = jest.fn();
    const { getByText } = render(
      <AdaptivityElementAnswerSelection
        question={{
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
              isSelected: true, // must be true to enable submit button
              isCorrect: false,
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={submitSelection}
        closeSelection={() => {}}
      />,
    );

    getByText("submitAnswer").click();

    expect(submitSelection).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EWE0008, EWE0009]
  test("click on answer button inverts its isSelected flag", () => {
    const answer = {
      answerIndex: 0,
      answerText: "testAnswerText",
      isSelected: false,
      isCorrect: false,
    };
    const { getByText } = render(
      <AdaptivityElementAnswerSelection
        question={{
          questionID: 0,
          questionText: "testQuestionText",
          isMultipleChoice: false,
          difficulty: 0,
          isCompleted: false,
          isRequired: false,
          questionAnswers: [answer],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />,
    );

    for (let i = 0; i < 2; i++) {
      let oldIsSelected = answer.isSelected;
      getByText("testAnswerText").click();

      expect(answer.isSelected).toBe(!oldIsSelected);
    }
  });

  // ANF-ID: [EWE0008]
  test("click on answer button deselects all other answers if question is single choice", () => {
    const answer1 = {
      answerIndex: 0,
      answerText: "testAnswerText1",
      isSelected: false,
    };
    const answer2 = {
      answerIndex: 1,
      answerText: "testAnswerText2",
      isSelected: false,
    };
    const { getByText } = render(
      <AdaptivityElementAnswerSelection
        question={{
          questionID: 0,
          questionText: "testQuestionText",
          isMultipleChoice: false,
          difficulty: 0,
          isCompleted: false,
          isRequired: false,
          questionAnswers: [answer1, answer2],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />,
    );

    getByText("testAnswerText1").click();

    expect(answer1.isSelected).toBe(true);
    expect(answer2.isSelected).toBe(false);
  });

  // ANF-ID: [ELG0034]
  test("answer button is green if answer is correct and question is already completed", () => {
    const { container } = render(
      <AdaptivityElementAnswerSelection
        question={{
          questionID: 0,
          questionText: "testQuestionText",
          isMultipleChoice: false,
          difficulty: 0,
          isCompleted: true,
          isRequired: false,
          questionAnswers: [
            {
              answerIndex: 0,
              answerText: "testAnswerText",
              isSelected: true,
              isCorrect: true,
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
