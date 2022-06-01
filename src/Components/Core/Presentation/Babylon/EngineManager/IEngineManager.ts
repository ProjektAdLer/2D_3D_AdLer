import { Engine } from "@babylonjs/core";

export default interface IEngineManager {
  get Engine(): Engine;
  createEngine(canvas: HTMLCanvasElement): void;
}
