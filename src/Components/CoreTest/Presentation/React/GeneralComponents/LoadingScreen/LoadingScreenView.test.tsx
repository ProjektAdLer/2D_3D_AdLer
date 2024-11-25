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
    render(
      <LoadingScreen
        content={<></>}
        i18nKeys={{
          namespace: "namespace",
          button: "buttonText",
        }}
      />,
    );
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new LoadingScreenViewModel(), undefined]);
    const { container } = render(
      <LoadingScreen
        content={<></>}
        i18nKeys={{
          namespace: "namespace",
          button: "buttonText",
        }}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ILoadingScreenController>()]);
    const { container } = render(
      <LoadingScreen
        content={<></>}
        i18nKeys={{
          namespace: "namespace",
          button: "buttonText",
        }}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  //ANF-ID: [EWE0023]
  test("onClick calls controller to close loading screen", () => {
    useBuilderMock([viewModel, controllerMock]);
    viewModel.isReadyToBeClosed.Value = true;
    const componentUnderTest = render(
      <LoadingScreen
        content={<></>}
        i18nKeys={{
          namespace: "namespace",
          button: "buttonText",
        }}
      />,
    );
    const button = componentUnderTest.getByRole("button");
    fireEvent.click(button);
    expect(controllerMock.closeLoadingScreen).toHaveBeenCalled();
  });

  test("calls controller to close loading screen if autoclose is true and loading screen can be closed", () => {
    useBuilderMock([viewModel, controllerMock]);
    viewModel.isReadyToBeClosed.Value = true;
    const componentUnderTest = render(
      <LoadingScreen
        content={<></>}
        i18nKeys={{
          namespace: "namespace",
          button: "buttonText",
          onLoading: "loadText",
          onLoadingFinished: "finishedText",
        }}
        autoClose={true}
      />,
    );
    expect(controllerMock.closeLoadingScreen).toHaveBeenCalled();
  });
});
