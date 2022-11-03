import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import StyledModal from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledModal";
import React from "react";

describe("StyledModal", () => {
  test("should render children if open", () => {
    const componentUnderTest = render(
      <StyledModal showModal>
        <div>Test</div>
      </StyledModal>
    );
    expect(componentUnderTest.getByText("Test")).toBeInTheDocument();
  });

  test("should not Render children, if not open", () => {
    const componentUnderTest = render(
      <StyledModal showModal={false}>
        <div>Test</div>
      </StyledModal>
    );
    expect(componentUnderTest.queryByText("Test")).toBeNull();
  });
});
