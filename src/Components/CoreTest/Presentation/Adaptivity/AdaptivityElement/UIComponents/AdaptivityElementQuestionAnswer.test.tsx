import { render } from "@testing-library/react";
import AdaptivityElementQuestionAnswer from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementQuestionAnswer";
import React from "react";

describe("AdaptivityElementQuestionAnswer", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementQuestionAnswer
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
        }}
        setHeaderText={() => {}}
        submitSelection={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
