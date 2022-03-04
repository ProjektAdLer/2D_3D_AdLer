import { Scene } from "@babylonjs/core/scene";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import SceneViewModel from "../../../Core/Presentation/SceneManagment/SceneViewModel";

jest.mock("@babylonjs/core/scene", () => {
  return {
    Scene: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

describe("SceneViewModel", () => {
  let sceneViewModel: SceneViewModel;

  beforeEach(() => {
    sceneViewModel = new SceneViewModel();
  });

  test("Scene setter sets a scene, getter returns the scene", () => {
    //@ts-ignore
    let testScene = new Scene();
    sceneViewModel.Scene = testScene;
    expect(sceneViewModel.Scene).toStrictEqual(testScene);
  });

  test("Scene getter throws error when Scene isn't set", () => {
    let scene;
    expect(() => {
      scene = sceneViewModel.Scene;
    }).toThrowError();
  });
});
