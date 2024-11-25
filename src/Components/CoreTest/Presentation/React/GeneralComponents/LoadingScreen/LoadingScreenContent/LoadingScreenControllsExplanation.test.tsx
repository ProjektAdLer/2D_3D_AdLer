import React from "react";
import { render } from "@testing-library/react";
import LoadingScreenControlsExplanation from "../../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenControlsExplanation";

describe("LoadingScreenControlsExplanation", () => {
  test("should render", () => {
    const { container } = render(<LoadingScreenControlsExplanation />);
    expect(container).toMatchSnapshot();
  });
});
