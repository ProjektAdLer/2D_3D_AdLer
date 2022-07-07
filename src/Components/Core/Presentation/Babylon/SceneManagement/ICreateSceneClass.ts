type Engine = import("@babylonjs/core/Engines/engine").Engine;
type Scene = import("@babylonjs/core/scene").Scene;

export default interface ICreateSceneClass {
  createScene: (engine: Engine) => Promise<Scene>;
  preTasks?: Promise<unknown>[];
}
