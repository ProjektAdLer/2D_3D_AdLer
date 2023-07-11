import { mock, mockDeep } from "jest-mock-extended";
import MovementIndicator from "../../../../Core/Presentation/Babylon/MovementIndicator/MovementIndicator";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import { Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";

jest.mock("@babylonjs/core/Materials");

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
scenePresenterMock.Scene.lights = [];

const mockMesh = mock<Mesh>();

describe("MovementIndicator", () => {
  let systemUnderTest: MovementIndicator;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  beforeEach(() => {
    jest.spyOn(MeshBuilder, "CreateTorus").mockReturnValue(mockMesh);

    systemUnderTest = new MovementIndicator();
  });

  test("display sets the indicator visible and at the correct position", () => {
    const position = new Vector3(1, 2, 3);

    systemUnderTest.display(position);

    expect(systemUnderTest["mesh"].isVisible).toBe(true);
    expect(systemUnderTest["mesh"].position).toEqual(position);
  });

  test("display starts the animation looping by default", () => {
    const position = new Vector3(1, 2, 3);

    systemUnderTest.display(position);

    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledTimes(1);
    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledWith(
      systemUnderTest["mesh"],
      expect.any(Number),
      expect.any(Number),
      true,
      expect.any(Number),
      undefined
    );
  });

  test("display starts the animation not looping if loopUntilHidden is set to false", () => {
    const position = new Vector3(1, 2, 3);

    systemUnderTest.display(position, false);

    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledTimes(1);
    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledWith(
      systemUnderTest["mesh"],
      expect.any(Number),
      expect.any(Number),
      false,
      expect.any(Number),
      systemUnderTest.hide
    );
  });

  test("hide sets the indicator invisible", () => {
    systemUnderTest.hide();

    expect(systemUnderTest["mesh"].isVisible).toBe(false);
  });
});
