import { Engine } from "@babylonjs/core";

export default interface IEngineManager {
  readonly Engine: Engine;
  createEngine(canvas: HTMLCanvasElement): void;
}
