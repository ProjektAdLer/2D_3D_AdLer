import { Scene } from "@babylonjs/core";
import ICreateSceneClass from "./ICreateSceneClass";

export default interface IScenePresenter {
  createScene(createSceneClass: ICreateSceneClass): Promise<void>;
  createRenderLoop(): void;
  get Scene(): Scene;
}
