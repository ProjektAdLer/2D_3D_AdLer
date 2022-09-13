import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/App";

jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningRoom.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningWorldMenu.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WelcomePage.tsx",
  () => "mocked"
);

describe("App", () => {
  test("should render", () => {
    render(<App />);
  });
});
