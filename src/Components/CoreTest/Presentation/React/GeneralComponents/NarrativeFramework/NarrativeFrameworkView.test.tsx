import React from "react";
import { render } from "@testing-library/react";
import NarrativeFramework from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFramework";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

describe("NarrativeFrameworkView", () => {
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework />
      </Provider>,
    );
  });
});
