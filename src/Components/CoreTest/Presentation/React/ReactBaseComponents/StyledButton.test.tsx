import StyledButton from "../../../../Core/Presentation/React/ReactBaseComponents/StyledButton";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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
