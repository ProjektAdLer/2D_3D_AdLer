import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AvatarEditorPreview from "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreview";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";
import IAvatarEditorPreviewController from "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/IAvatarEditorPreviewController";
import { Provider } from "inversify-react";

jest.mock(
  "../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas",
  () => "MockedBabylonCanvas",
);
jest.mock(
  "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewSceneDefinition",
);

const controllerMock = mock<IAvatarEditorPreviewController>();

describe("AvatarEditorPreview", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EZZ0055]
  test("should render", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    expect(renderResult.container).toMatchSnapshot();
  });

  test("MouseDown on left turn button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const leftTurnButton = renderResult.getByTestId("left-turn-button");

    fireEvent.pointerDown(leftTurnButton);

    expect(controllerMock.onTurnLeftDown).toHaveBeenCalledTimes(1);
  });

  test("MouseUp on turn left button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const leftTurnButton = renderResult.getByTestId("left-turn-button");

    fireEvent.pointerUp(leftTurnButton);

    expect(controllerMock.onTurnLeftUp).toHaveBeenCalledTimes(1);
  });

  test("MouseDown on zoom in button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const zoomInButton = renderResult.getByTestId("zoom-in-button");

    fireEvent.pointerDown(zoomInButton);

    expect(controllerMock.onZoomInDown).toHaveBeenCalledTimes(1);
  });

  test("MouseUp on zoom in button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const zoomInButton = renderResult.getByTestId("zoom-in-button");

    fireEvent.pointerUp(zoomInButton);

    expect(controllerMock.onZoomInUp).toHaveBeenCalledTimes(1);
  });

  test("MouseDown on zoom out button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const zoomOutButton = renderResult.getByTestId("zoom-out-button");

    fireEvent.pointerDown(zoomOutButton);

    expect(controllerMock.onZoomOutDown).toHaveBeenCalledTimes(1);
  });

  test("MouseUp on zoom out button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const zoomOutButton = renderResult.getByTestId("zoom-out-button");

    fireEvent.pointerUp(zoomOutButton);

    expect(controllerMock.onZoomOutUp).toHaveBeenCalledTimes(1);
  });

  test("MouseDown on right turn button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const rightTurnButton = renderResult.getByTestId("right-turn-button");

    fireEvent.pointerDown(rightTurnButton);

    expect(controllerMock.onTurnRightDown).toHaveBeenCalledTimes(1);
  });

  test("MouseUp on right turn button calls controller", () => {
    useBuilderMock([undefined, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditorPreview />,
      </Provider>,
    );

    const rightTurnButton = renderResult.getByTestId("right-turn-button");

    fireEvent.pointerUp(rightTurnButton);

    expect(controllerMock.onTurnRightUp).toHaveBeenCalledTimes(1);
  });
});
