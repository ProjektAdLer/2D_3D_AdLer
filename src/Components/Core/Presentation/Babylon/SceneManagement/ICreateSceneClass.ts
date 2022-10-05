import { Engine, Scene, SceneOptions } from "@babylonjs/core";

/**
 * @description This class is responsible for creating a Scene.
 */
export default interface ICreateSceneClass {
  /**
   * This array contains functions that need to be executed before the scene is created.
   * This is useful for loading data that is required for the scene.
   * The functions should be executed in the order they are added to the array.
   **/
  preTasks?: (() => Promise<void> | void)[];

  /**
   * This array contains functions creates the scene and returns it.
   **/
  createScene: (engine: Engine, sceneOptions?: SceneOptions) => Promise<Scene>;
}
