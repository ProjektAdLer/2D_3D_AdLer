import { AbstractMesh, ICrowd, RecastJSPlugin, Scene } from "@babylonjs/core";
import ICreateSceneClass from "./ICreateSceneClass";

export default interface IScenePresenter {
  get Scene(): Scene;
  get Navigation(): RecastJSPlugin;
  get NavigationCrowd(): ICrowd;
  createScene(createSceneClass: ICreateSceneClass): Promise<void>;
  startRenderLoop(): void;
  loadModel(url: string, isObstacle: boolean): Promise<AbstractMesh[]>;
}
