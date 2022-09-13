import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import StyledInputField from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledInputField";

describe("Styled Input Field", () => {
  it("should render an input field", () => {
    const componentUnderTest = render(<StyledInputField data-testid="test" />);
    expect(componentUnderTest.getByTestId("test")).toBeInTheDocument();
  });
});
