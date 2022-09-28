import { Engine, Scene, SceneOptions } from "@babylonjs/core";

export default interface ICreateSceneClass {
  createScene: (engine: Engine, sceneOptions?: SceneOptions) => Promise<Scene>;
  preTasks?: Promise<unknown>[];
}
