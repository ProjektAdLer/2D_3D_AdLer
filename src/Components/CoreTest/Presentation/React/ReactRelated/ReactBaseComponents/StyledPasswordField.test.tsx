import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import StyledPasswordField from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledPasswordField";
import React from "react";

describe("StyledPasswordField", () => {
  it("should render an input field", () => {
    const componentUnderTest = render(
      <StyledPasswordField data-testid="test" />
    );
    expect(componentUnderTest.getByTestId("test")).toBeInTheDocument();
  });
});
