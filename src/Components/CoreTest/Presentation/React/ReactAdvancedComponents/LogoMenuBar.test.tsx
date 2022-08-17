import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LogoMenuBar from "../../../../Core/Presentation/React/ReactAdvancedComponents/LogoMenuBar";

describe("LogoMenuBar", () => {
  test("should render", () => {
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();
    render(<LogoMenuBar />);
    // restore console.error
    console.error = originalError;
  });
});
