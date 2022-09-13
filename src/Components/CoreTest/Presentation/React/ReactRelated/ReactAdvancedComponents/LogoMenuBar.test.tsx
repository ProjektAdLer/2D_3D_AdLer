import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LogoMenuBar from "../../../../../Core/Presentation/React/ReactRelated/ReactAdvancedComponents/LogoMenuBar";
jest.mock(
  "../../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButton",
  () => "string"
);

jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/FullscreenSwitch/FullscreenSwitch",
  () => "string"
);

jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/DebugPanel/DebugPanel",
  () => "string"
);

jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadLearningWorldButton/LoadLearningWorldButton",
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
