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

  beforeAll(() => {
    sceneViewModel = CoreDIContainer.get(SceneViewModel);
  });

  test("Scene setter sets a scene, getter returns the scene", () => {
    let testScene = new Scene();
    sceneViewModel.Scene = testScene;
    expect(sceneViewModel.Scene).toStrictEqual(testScene);
  });
});
