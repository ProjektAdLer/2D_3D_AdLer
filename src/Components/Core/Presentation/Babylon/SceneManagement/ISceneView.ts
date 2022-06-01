import { Engine } from "@babylonjs/core";

export default interface ISceneView {
  startRenderLoop(engine: Engine): void;
}
