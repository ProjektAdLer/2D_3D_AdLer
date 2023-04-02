import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import LearningSpaceCompletionModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModal";
import LearningSpaceCompletionModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalController";
import LearningSpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("LearningSpaceCompletionModal", () => {
  test("should render", () => {
    const viewModel = new LearningSpaceCompletionModalViewModel();
    viewModel.showModal.Value = true;
    useBuilderMock([viewModel, mock<LearningSpaceCompletionModalController>()]);

    render(<LearningSpaceCompletionModal />);
  });

  test("should not render, if no showModal is false", () => {
    const viewModel = new LearningSpaceCompletionModalViewModel();
    viewModel.showModal.Value = false;
    useBuilderMock([viewModel, mock<LearningSpaceCompletionModalController>()]);

    const componentUnderTest = render(<LearningSpaceCompletionModal />);

    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("onClose of the modal should call the controller", () => {
    const viewModel = new LearningSpaceCompletionModalViewModel();
    viewModel.showModal.Value = true;
    const controllerMock = mock<LearningSpaceCompletionModalController>();
    useBuilderMock([viewModel, controllerMock]);

    const componentUnderTest = render(<LearningSpaceCompletionModal />);
    fireEvent.click(componentUnderTest.getByText("X"));

    expect(controllerMock.CloseButtonClicked).toBeCalledTimes(1);
  });

  test("spacemenu return button onClick should call the controller", () => {
    const viewModel = new LearningSpaceCompletionModalViewModel();
    viewModel.showModal.Value = true;
    const controllerMock = mock<LearningSpaceCompletionModalController>();
    useBuilderMock([viewModel, controllerMock]);

    const componentUnderTest = render(<LearningSpaceCompletionModal />);
    fireEvent.click(componentUnderTest.getByText("Zurück zum Lernraum-Menü"));

    expect(controllerMock.ReturnLearningSpaceMenuButtonClicked).toBeCalledTimes(
      1
    );
  });
});
