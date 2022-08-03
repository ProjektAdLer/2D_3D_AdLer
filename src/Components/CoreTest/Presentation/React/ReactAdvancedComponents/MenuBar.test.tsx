import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FullscreenSwitch from "../../../../Core/Presentation/React/FullscreenSwitch/FullscreenSwitch";
import MenuBar from "../../../../Core/Presentation/React/ReactAdvancedComponents/MenuBar";

let originalError: any;

jest.mock(
  "../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButton",
  () => "string"
);

jest.mock(
  "../../../../Core/Presentation/React/FullscreenSwitch/FullscreenSwitch",
  () => "string"
);

jest.mock(
  "../../../../Core/Presentation/React/DebugPanel/DebugPanel",
  () => "string"
);

jest.mock(
  "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButton",
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

describe("MenuBar", () => {
  test("should render", () => {
    render(<MenuBar />);
  });
});
function mockReactModule(modulePath: string) {
  jest.mock(modulePath, () => "string");
}
