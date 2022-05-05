import { injectable } from "inversify";
import { Color3, Scene } from "@babylonjs/core";
import Observable from "../../../../Lib/Observable";

@injectable()
export default class LearningRoomViewModel {
  public scene: Observable<Scene> = new Observable<Scene>();
  public wallColor: Observable<Color3> = new Observable(
    new Color3(0.3, 0.6, 0.8)
  );
  public roomWidth: Observable<number> = new Observable(10);
  public roomLength: Observable<number> = new Observable(10);
  public baseHeight: Observable<number> = new Observable(0.5);
  public roomHeight: Observable<number> = new Observable(2.5);
  public doorWidth: Observable<number> = new Observable(1.5);
  public doorHeight: Observable<number> = new Observable(2.28);
  public wallThickness: Observable<number> = new Observable(1);

  public learningElements: Observable<any> = new Observable([]);
  public id: string;
}
