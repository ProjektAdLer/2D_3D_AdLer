import { Scene } from "@babylonjs/core";
import ICreateSceneClass from "./ICreateSceneClass";

export default interface ISceneController {
  createScene(createSceneClass: ICreateSceneClass): Promise<void>;
  createRenderLoop(): void;
  get Scene(): Scene;
}
