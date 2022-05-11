import { Scene } from "@babylonjs/core/scene";
import SceneViewModel from "../../../../Core/Presentation/Babylon/SceneManagment/SceneViewModel";

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

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Scene setter sets a scene, getter returns the scene", () => {
    // this just works because the mock overrides the original constructor
    // should be changed to use the actual Scene constructor -MK
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
