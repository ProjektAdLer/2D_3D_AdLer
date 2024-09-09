import WelcomePage from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WelcomePage";
import { render } from "@testing-library/react";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

jest.mock(
  "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonView.tsx"
);
jest.mock(
  "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonView.tsx"
);

describe("Welcome Page", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>
    );
  });
});
