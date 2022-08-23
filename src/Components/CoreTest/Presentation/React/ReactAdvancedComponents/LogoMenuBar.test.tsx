import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LogoMenuBar from "../../../../Core/Presentation/React/ReactAdvancedComponents/LogoMenuBar";
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
