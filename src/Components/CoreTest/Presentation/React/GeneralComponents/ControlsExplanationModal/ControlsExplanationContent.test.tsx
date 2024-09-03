import React from "react";
import { render } from "@testing-library/react";
import ControlsExplanationContent from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/ControlsExplanationContent";

describe("ControlsExplanationContent", () => {
  test("should render", () => {
    const { container } = render(<ControlsExplanationContent />);
    expect(container).toMatchSnapshot();
  });
});
