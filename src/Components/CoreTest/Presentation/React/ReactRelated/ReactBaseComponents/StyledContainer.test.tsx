import { render } from "@testing-library/react";
import StyledContainer from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledContainer";
import "@testing-library/jest-dom";

describe("Styled Container", () => {
  test("should render", () => {
    const componentUnderTest = render(<StyledContainer data-testid="test" />);
    expect(componentUnderTest.baseElement).toBeInTheDocument();
  });

  test("should render its children", () => {
    const componentUnderTest = render(
      <StyledContainer data-testid="test">
        <div>Test</div>
      </StyledContainer>
    );
    expect(componentUnderTest.getByText("Test")).toBeInTheDocument();
  });
});
