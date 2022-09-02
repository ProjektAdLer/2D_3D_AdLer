import { Engine } from "@babylonjs/core";
import IEngineManager from "./IEngineManager";
import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";

@injectable()
export default class EngineManager implements IEngineManager {
  private engine: Engine;

  createEngine(canvas: HTMLCanvasElement): void {
    if (this.engine) {
      logger.warn("Engine already created");
      return;
    }

    this.engine = new Engine(canvas, true);

    // watch for browser/canvas resize events
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  get Engine(): Engine {
    if (!this.engine) throw new Error("Engine not created");
    return this.engine;
  }
}
