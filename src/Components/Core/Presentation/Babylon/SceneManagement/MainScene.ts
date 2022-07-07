import ICreateSceneClass from "./ICreateSceneClass";
import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  GroundMesh,
  Color4,
  FreeCamera,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { injectable } from "inversify";
import { config } from "../../../../../config";

@injectable()
export default class MainScene implements ICreateSceneClass {
  preTasks = [];

  createScene = async (engine: Engine): Promise<Scene> => {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.66, 0.83, 0.98, 1); /* Lightblue */
    /* scene.clearColor = new Color4(0.97, 0.67, 0.44, 1); */ /* Orange */
    /* scene.clearColor = new Color4(0.65, 0.96, 0.72, 1); */ /* Leichtes Türkis */
    /* scene.clearColor = new Color4(0.87, 0.96, 0.84, 1); */ /* Ultraleichtes Grün */

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    new GroundMesh("Ground", scene);

    // camera to prevent rendering the scene without camera
    // TODO: remove this when Babylon component is better initilized
    new FreeCamera("FreeCamera", new Vector3(20, 20, 20), scene);

    if (config.isDebug) scene.debugLayer.show();

    return scene;
  };
}
