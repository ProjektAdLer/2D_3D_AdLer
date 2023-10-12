import { render } from "@testing-library/react";
import React from "react";
import AdaptivityElementAnswerFeedback from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementAnswerFeedback";

describe("AdaptivityElementAnswerFeedback", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementAnswerFeedback
        isCorrect={false}
        setHeaderText={() => {}}
        closeFeedback={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
