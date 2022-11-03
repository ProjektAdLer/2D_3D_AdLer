import StyledButton from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledButton";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("Styled Button", () => {
  it("should render a button", () => {
    const { getByText } = render(<StyledButton>Test</StyledButton>);
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should render a button with a className", () => {
    const { getByText } = render(
      <StyledButton className="test">Test</StyledButton>
    );
    expect(getByText("Test")).toHaveClass("test");
  });
});
