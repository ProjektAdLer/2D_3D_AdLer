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
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

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
              isSelected: false,
            },
          ],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={submitSelection}
        closeSelection={() => {}}
      />
    );

    getByText("Antworten abgeben").click();

    expect(submitSelection).toHaveBeenCalledTimes(1);
  });

  test("click on answer button inverts its isSelected flag", () => {
    const answer = {
      answerIndex: 0,
      answerText: "testAnswerText",
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
          questionAnswers: [answer],
          hints: [],
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
        closeSelection={() => {}}
      />
    );

    for (let i = 0; i < 2; i++) {
      let oldIsSelected = answer.isSelected;
      getByText("testAnswerText").click();

      expect(answer.isSelected).toBe(!oldIsSelected);
    }
  });
});
