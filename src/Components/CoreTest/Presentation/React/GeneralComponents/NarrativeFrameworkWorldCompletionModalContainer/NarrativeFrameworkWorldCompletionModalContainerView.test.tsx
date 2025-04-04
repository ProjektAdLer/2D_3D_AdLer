import { mock } from "jest-mock-extended";
import INarrativeFrameworkWorldCompletionModalContainerController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/INarrativeFrameworkWorldCompletionModalContainerController";
import NarrativeFrameworkWorldCompletionModalContainerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/NarrativeFrameworkWorldCompletionModalContainerViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import React from "react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import NarrativeFrameworkWorldCompletionModalContainer from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/NarrativeFrameworkWorldCompletionModalContainer";

let mockViewModel =
  new NarrativeFrameworkWorldCompletionModalContainerViewModel();
let mockController =
  mock<INarrativeFrameworkWorldCompletionModalContainerController>();

describe("NarrativeFrameworkWorldCompletionModalContainerView", () => {
  test("should render", () => {
    useBuilderMock([mockViewModel, mockController]);
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkWorldCompletionModalContainer />
      </Provider>,
    );
  });
  test("should not render if viewmodel is undefined", () => {
    useBuilderMock([undefined, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkWorldCompletionModalContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });

  test("should not render if controller is undefined", () => {
    useBuilderMock([mockViewModel, undefined]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkWorldCompletionModalContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
});
