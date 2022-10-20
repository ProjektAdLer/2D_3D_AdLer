import { HighlightLayer, NullEngine, Scene } from "@babylonjs/core";
import AbstractSceneDefinition from "../../../../Core/Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";

export default class TestSceneDefinition extends AbstractSceneDefinition {
  protected initializeScene(): Promise<void> {
    return Promise.resolve();
  }
}

/**
 * Util function to create a scene with a null engine inside given TestSceneDefinition.
 * @param testSceneDefinition The TestSceneDefinition to create the scene in.
 * @returns The created scene.
 */
export function fillTestSceneDefinitionSceneGetter(
  testSceneDefinition: TestSceneDefinition
): Scene {
  const scene = new Scene(new NullEngine());
  testSceneDefinition["scene"] = scene;
  return scene;
}

/**
 * Util function to create a highlightLayer with a null engine inside given TestSceneDefinition.
 * @param testSceneDefinition The TestSceneDefinition to create the highlightLayer in.
 * @returns The created highlightLayer.
 */
export function fillTestSceneDefinitionHighlightLayerGetter(
  testSceneDefinition: TestSceneDefinition
): HighlightLayer {
  const highlightLayer = new HighlightLayer(
    "test",
    new Scene(new NullEngine())
  );
  testSceneDefinition["highlightLayer"] = highlightLayer;
  return highlightLayer;
}
