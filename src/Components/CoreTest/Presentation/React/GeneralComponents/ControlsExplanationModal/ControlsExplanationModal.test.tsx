import { act, render } from "@testing-library/react";
import React from "react";
import ControlsExplanationModal from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/ControlsExplanationModal";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ControlsExplanationModalViewModel from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/ControlsExplanationModalViewModel";

describe("ControlsExplanationModal", () => {
  beforeEach(() => {
    const viewModel = new ControlsExplanationModalViewModel();
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, undefined]);
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, undefined]);
    const { container } = render(
      <Provider container={CoreDIContainer}>
        <ControlsExplanationModal />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  // ANF-ID: [EZZ0033]
  test("should render", () => {
    const { container } = render(
      <Provider container={CoreDIContainer}>
        <ControlsExplanationModal />
      </Provider>,
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container).toMatchSnapshot();
  });

  test("doesn't render after the close button is clicked", () => {
    const { container, getByRole } = render(
      <Provider container={CoreDIContainer}>
        <ControlsExplanationModal />
      </Provider>,
    );
    const closeButton = getByRole("button", { hidden: true });

    act(() => {
      closeButton.click();
    });

    expect(container).toBeEmptyDOMElement();
  });
});
