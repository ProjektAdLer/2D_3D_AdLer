import { Engine } from "@babylonjs/core";
import { injectable } from "inversify";
import PrototypeScene from "../../../Prototyping/PrototypeScene";

@injectable()
export default class SceneManager {
  public constructor() {
    console.log("Scene Manager");
  }
  public babylonInit = async (canvas: HTMLCanvasElement) => {
    const engine = new Engine(canvas, true);
    const createSceneModule = new PrototypeScene();

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || []);

    // Create the scene
    const scene = await createSceneModule.createScene(engine, canvas);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
      scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
      engine.resize();
    });
  };
}
