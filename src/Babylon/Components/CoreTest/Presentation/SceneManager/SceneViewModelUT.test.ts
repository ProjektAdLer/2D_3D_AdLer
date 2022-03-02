jest.mock("@babylon/core");

import { Scene } from "@babylonjs/core/scene";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import SceneViewModel from "../../../Core/Presentation/SceneManagment/SceneViewModel";

describe("SceneViewModel", () => {
  let sceneViewModel: SceneViewModel;

  beforeAll(() => {
    sceneViewModel = CoreDIContainer.get(SceneViewModel);
  });

  test.todo("Scene setter sets a scene, getter retruns the scene");
});
