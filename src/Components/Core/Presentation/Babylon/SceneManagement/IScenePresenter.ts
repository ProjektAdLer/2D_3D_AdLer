import { Scene } from "@babylonjs/core";
import ICreateSceneClass from "./ICreateSceneClass";

export default interface IScenePresenter {
  createScene(createSceneClass: ICreateSceneClass): Promise<void>;
  startRenderLoop(): void;
  get Scene(): Scene;
}
