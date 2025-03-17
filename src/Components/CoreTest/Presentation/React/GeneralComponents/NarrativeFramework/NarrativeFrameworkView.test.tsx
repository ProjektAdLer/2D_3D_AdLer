import React from "react";
import { render } from "@testing-library/react";
import NarrativeFramework from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFramework";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";
import { mock } from "jest-mock-extended";
import INarrativeFrameworkController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/INarrativeFrameworkController";

let mockViewModel = new NarrativeFrameworkViewModel();
let mockController = mock<INarrativeFrameworkController>();
describe("NarrativeFrameworkView", () => {
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework />
      </Provider>,
    );
  });

  test("should not render if introtext and outrotext is undefined", () => {
    mockViewModel.introText = undefined;
    mockViewModel.outroText = undefined;
    mockViewModel.isOpen.Value = true;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
});
