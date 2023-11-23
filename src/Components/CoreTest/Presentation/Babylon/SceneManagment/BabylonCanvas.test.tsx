import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import ILoadingScreenPresenter from "../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/ILoadingScreenPresenter";
import BabylonCanvas from "../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas";
import { Engine } from "@babylonjs/core";
import React from "react";
import TestSceneDefinition from "./TestSceneDefinition";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

jest.mock("@babylonjs/core");
const scenePresenterMock = mock<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
const loadingScreenPresenterMock = mock<ILoadingScreenPresenter>();

describe("Babylon Canvas", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILoadingScreenPresenter
    ).toConstantValue(loadingScreenPresenterMock);
  });

  beforeEach(() => {
    scenePresenterMock.createScene.mockResolvedValue();
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(<BabylonCanvas sceneDefinitionType={TestSceneDefinition} />);
  });

  test("calls createScene on scenePresenter", () => {
    render(<BabylonCanvas sceneDefinitionType={TestSceneDefinition} />);

    expect(scenePresenterMock.createScene).toHaveBeenCalledTimes(1);
  });

  test("calls startRenderLoop on scenePresenter", () => {
    render(<BabylonCanvas sceneDefinitionType={TestSceneDefinition} />);

    waitFor(() => {
      expect(scenePresenterMock.startRenderLoop).toHaveBeenCalledTimes(1);
    });
  });

  test("window resize event calls callback", () => {
    render(<BabylonCanvas sceneDefinitionType={TestSceneDefinition} />);

    fireEvent(window, new Event("resize"));

    expect(Engine["prototype"].resize).toHaveBeenCalledTimes(1);
  });

  test("unmount disposes of the engine", () => {
    const { unmount } = render(
      <BabylonCanvas sceneDefinitionType={TestSceneDefinition} />
    );

    unmount();

    expect(Engine["prototype"].dispose).toHaveBeenCalledTimes(1);
  });

  test("unmount removes window resize event listener", () => {
    const container = render(
      <BabylonCanvas sceneDefinitionType={TestSceneDefinition} />
    );
    container.unmount();

    fireEvent(window, new Event("resize"));

    expect(Engine["prototype"].resize).toHaveBeenCalledTimes(0);
  });
});
