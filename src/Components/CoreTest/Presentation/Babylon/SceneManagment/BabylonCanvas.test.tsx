import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import BabylonCanvas from "../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas";
import { Engine } from "@babylonjs/core";
import AbstractSceneDefinition from "../../../../Core/Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";

jest.mock("@babylonjs/core");
const scenePresenterMock = mock<IScenePresenter>();

describe("Babylon Canvas", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(
      <BabylonCanvas createSceneClass={mock<AbstractSceneDefinition>()} />
    );
  });

  test("calls createScene on scenePresenter", () => {
    render(
      <BabylonCanvas
        createSceneClass={CoreDIContainer.get<AbstractSceneDefinition>(
          CORE_TYPES.AbstractSceneDefinition
        )}
      />
    );

    expect(scenePresenterMock.createScene).toHaveBeenCalledTimes(1);
  });

  test("calls startRenderLoop on scenePresenter", () => {
    render(
      <BabylonCanvas
        createSceneClass={CoreDIContainer.get<AbstractSceneDefinition>(
          CORE_TYPES.AbstractSceneDefinition
        )}
      />
    );

    waitFor(() => {
      expect(scenePresenterMock.startRenderLoop).toHaveBeenCalledTimes(1);
    });
  });

  test("window resize event calls callback", () => {
    render(
      <BabylonCanvas
        createSceneClass={CoreDIContainer.get<AbstractSceneDefinition>(
          CORE_TYPES.AbstractSceneDefinition
        )}
      />
    );

    fireEvent(window, new Event("resize"));

    expect(Engine["prototype"].resize).toHaveBeenCalledTimes(1);
  });

  test("unmount disposes of the engine", () => {
    const { unmount } = render(
      <BabylonCanvas
        createSceneClass={CoreDIContainer.get<AbstractSceneDefinition>(
          CORE_TYPES.AbstractSceneDefinition
        )}
      />
    );

    unmount();

    expect(Engine["prototype"].dispose).toHaveBeenCalledTimes(1);
  });

  test("unmount removes window resize event listener", () => {
    const container = render(
      <BabylonCanvas
        createSceneClass={CoreDIContainer.get<AbstractSceneDefinition>(
          CORE_TYPES.AbstractSceneDefinition
        )}
      />
    );
    container.unmount();

    fireEvent(window, new Event("resize"));

    expect(Engine["prototype"].resize).toHaveBeenCalledTimes(0);
  });
});
