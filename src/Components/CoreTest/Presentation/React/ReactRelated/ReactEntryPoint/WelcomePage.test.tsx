import WelcomePage from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WelcomePage";
import { render } from "@testing-library/react";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";
import "@testing-library/jest-dom";
import React from "react";
describe("Welcome Page", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<WelcomePage />);
  });
});
