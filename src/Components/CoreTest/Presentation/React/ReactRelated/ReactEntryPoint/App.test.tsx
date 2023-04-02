import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/App";
import history from "history/browser";
import React from "react";

jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpace.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpaceMenu.tsx",
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
  //TODO: Tests are not entering the switch case constructs yet.
  test("App works if pathname is /spacedisplay", () => {
    render(<App />);
    history.push("/spacedisplay");
    expect(history.location.pathname).toBe("/spacedisplay");
  });
  test("App works if pathname is /spacemenu", () => {
    render(<App />);
    history.push("/spacemenu");
    expect(history.location.pathname).toBe("/spacemenu");
  });
});
