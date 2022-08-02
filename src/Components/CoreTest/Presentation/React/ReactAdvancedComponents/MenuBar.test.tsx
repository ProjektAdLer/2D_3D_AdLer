import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MenuBar from "../../../../Core/Presentation/React/ReactAdvancedComponents/MenuBar";

let originalError: any;

jest.mock(
  "../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButton",
  () => "string"
);

jest.mock(
  "../../../../Core/Presentation/React/DebugPanel/DebugPanel",
  () => "string"
);

beforeAll(() => {
  // disable console.error
  originalError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  // restore console.error
  console.error = originalError;
});

describe("LogoMenuBar", () => {
  test("should render", () => {
    render(<MenuBar />);
  });
});
