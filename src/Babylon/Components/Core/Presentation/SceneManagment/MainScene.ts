import ICreateSceneClass from "./ICreateSceneClass";
import {
  Engine,
  FreeCamera,
  Scene,
  Vector3,
  HemisphericLight,
  GroundMesh,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { injectable, inject } from "inversify";
import RoomGenerator from "../RoomGenerator/RoomGenerator";
import CORE_TYPES from "../../DependencyInjection/types";

@injectable()
export default class MainScene implements ICreateSceneClass {
  preTasks = [];
  private roomGenerator: RoomGenerator;

  createScene = async (
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> => {
    const scene = new Scene(engine);

    var camera = new FreeCamera("camera1", new Vector3(20, 20, 20), scene);
    camera.setTarget(new Vector3(0, 0, 0));
    camera.fov = 0.8;
    camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    new GroundMesh("Ground", scene);

    scene.debugLayer.show();

    return scene;
  };
}
