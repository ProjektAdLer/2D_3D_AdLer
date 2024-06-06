import { fireEvent, render } from "@testing-library/react";
import mock from "jest-mock-extended/lib/Mock";
import LoadingScreen from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreen";
import LoadingScreenViewModel from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenViewModel";
import ILoadingScreenController from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/ILoadingScreenController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

const viewModel = new LoadingScreenViewModel();
const controllerMock = mock<ILoadingScreenController>();

describe("LoadingScreen", () => {
  //ANF-ID: [EWE0023]
  test("should render", () => {
    useBuilderMock([viewModel, controllerMock]);

    viewModel.loadStep.Value = "Test";
    render(<LoadingScreen />);
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new LoadingScreenViewModel(), undefined]);
    const { container } = render(<LoadingScreen />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ILoadingScreenController>()]);
    const { container } = render(<LoadingScreen />);
    expect(container.firstChild).toBeNull();
  });

  //ANF-ID: [EWE0023]
  test("onClick calls controller to close loading screen", () => {
    useBuilderMock([viewModel, controllerMock]);
    viewModel.isReadyToBeClosed.Value = true;
    const componentUnderTest = render(<LoadingScreen />);
    const button = componentUnderTest.getByRole("button");
    fireEvent.click(button);
    expect(controllerMock.closeLoadingScreen).toHaveBeenCalled();
  });
});
