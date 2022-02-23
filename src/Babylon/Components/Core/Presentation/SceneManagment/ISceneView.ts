import { Engine } from "@babylonjs/core";

export default interface ISceneView {
  createRenderLoop(engine: Engine): void;
}
