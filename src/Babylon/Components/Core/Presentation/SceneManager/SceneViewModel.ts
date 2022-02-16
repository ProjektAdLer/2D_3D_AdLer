import { injectable } from "inversify";
import { Scene } from "@babylonjs/core";

@injectable()
export default class SceneViewModel {
  private scene: Scene;

  get Scene(): Scene {
    if (!this.Scene) throw new Error("Scene not found!");
    return this.scene;
  }

  set Scene(newScene: Scene) {
    this.scene = newScene;
  }
}
