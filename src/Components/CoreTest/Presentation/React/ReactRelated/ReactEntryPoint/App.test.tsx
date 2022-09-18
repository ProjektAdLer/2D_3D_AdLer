import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/App";

jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/Space.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WorldMenu.tsx",
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
