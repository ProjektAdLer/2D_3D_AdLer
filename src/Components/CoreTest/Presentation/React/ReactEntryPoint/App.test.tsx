import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../../../../Core/Presentation/React/ReactEntryPoint/App";

jest.mock(
  "../../../../Core/Presentation/React/ReactEntryPoint/LearningRoom.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/ReactEntryPoint/LearningWorldMenu.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/ReactEntryPoint/WelcomePage.tsx",
  () => "mocked"
);

describe("App", () => {
  test("should render", () => {
    render(<App />);
  });
});
