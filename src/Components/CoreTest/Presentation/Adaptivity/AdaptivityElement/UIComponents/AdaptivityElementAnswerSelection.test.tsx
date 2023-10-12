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
});
