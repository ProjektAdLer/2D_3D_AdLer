import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import HelpDeskModalViewModel from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalViewModel";
import HelpDeskModal from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

let viewModel = new HelpDeskModalViewModel();
viewModel.isOpen.Value = true;
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("HelpDeskModal", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, undefined]);
    const { container } = render(
      <Provider container={CoreDIContainer}>
        <HelpDeskModal />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  test("should not render when closed", () => {
    viewModel.isOpen.Value = false;

    useBuilderMock([viewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <HelpDeskModal />
      </Provider>
    );
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  test("should render its content", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <HelpDeskModal />
      </Provider>
    );
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  test("should close when close button is clicked", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, undefined]);
    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <HelpDeskModal />
      </Provider>
    );
    const closeButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);
    expect(viewModel.isOpen.Value).toBe(false);
  });

  test("clicking hidden button toggles babylon inspector", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <HelpDeskModal />
      </Provider>
    );

    waitFor(() => {
      const inspectorButton = componentUnderTest.getByTestId(
        "testInspectorButton"
      );
      fireEvent.click(inspectorButton);
      expect(scenePresenterMock.toggleInspector).toHaveBeenCalledWith({
        overlay: true,
      });
    });
  });
});
