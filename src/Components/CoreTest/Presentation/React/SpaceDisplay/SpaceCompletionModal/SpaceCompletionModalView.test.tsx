import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import SpaceCompletionModal from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModal";
import SpaceCompletionModalController from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalController";
import SpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("SpaceCompletionModal", () => {
  test("should render", () => {
    const viewModel = new SpaceCompletionModalViewModel();
    viewModel.showModal.Value = true;
    useBuilderMock([viewModel, mock<SpaceCompletionModalController>()]);

    render(<SpaceCompletionModal />);
  });

  test("should not render, if no showModal is false", () => {
    const viewModel = new SpaceCompletionModalViewModel();
    viewModel.showModal.Value = false;
    useBuilderMock([viewModel, mock<SpaceCompletionModalController>()]);

    const componentUnderTest = render(<SpaceCompletionModal />);

    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("onClose of the modal should call the controller", () => {
    const viewModel = new SpaceCompletionModalViewModel();
    viewModel.showModal.Value = true;
    const controllerMock = mock<SpaceCompletionModalController>();
    useBuilderMock([viewModel, controllerMock]);

    const componentUnderTest = render(<SpaceCompletionModal />);
    fireEvent.click(componentUnderTest.getByText("X"));

    expect(controllerMock.CloseButtonClicked).toBeCalledTimes(1);
  });

  test("spacemenu return button onClick should call the controller", () => {
    const viewModel = new SpaceCompletionModalViewModel();
    viewModel.showModal.Value = true;
    const controllerMock = mock<SpaceCompletionModalController>();
    useBuilderMock([viewModel, controllerMock]);

    const componentUnderTest = render(<SpaceCompletionModal />);
    fireEvent.click(componentUnderTest.getByText("Zurück zum Lernraum-Menü"));

    expect(controllerMock.ReturnSpaceMenuButtonClicked).toBeCalledTimes(1);
  });
});
