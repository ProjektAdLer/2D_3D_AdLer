import AbstractSceneDefinition from "../../../../Core/Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";

export default class TestSceneDefinition extends AbstractSceneDefinition {
  protected initializeScene(): Promise<void> {
    return Promise.resolve();
  }
}
