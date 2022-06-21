import ICreateSceneClass from "./ICreateSceneClass";
import {
  Engine,
  FreeCamera,
  Scene,
  Vector3,
  HemisphericLight,
  GroundMesh,
  Color4,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IEngineManager from "../EngineManager/IEngineManager";

@injectable()
export default class MainScene implements ICreateSceneClass {
  preTasks = [];

  createScene = async (
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> => {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.66, 0.83, 0.98, 1); /* Lightblue */
    /* scene.clearColor = new Color4(0.97, 0.67, 0.44, 1); */ /* Orange */
    /* scene.clearColor = new Color4(0.65, 0.96, 0.72, 1); */ /* Leichtes Türkis */
    /* scene.clearColor = new Color4(0.87, 0.96, 0.84, 1); */ /* Ultraleichtes Grün */

    this.setCamera(scene);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    new GroundMesh("Ground", scene);

    // TODO: move this somewhere else or wrap with some sort of environmental condition -MK
    // scene.debugLayer.show();

    return scene;
  };

  private setCamera(scene: Scene) {
    // Old free camera for debug purposes (might break in AvatarView.ts due to FollowCamera Code) (~FK):
    let camera1 = new FreeCamera("FreeCamera", new Vector3(20, 20, 20), scene);
    camera1.setTarget(new Vector3(0, 0, 0));
    camera1.fov = 0.8;
    camera1.attachControl(
      CoreDIContainer.get<IEngineManager>(
        CORE_TYPES.IEngineManager
      ).Engine.getRenderingCanvas(),
      true
    );
  }
}
