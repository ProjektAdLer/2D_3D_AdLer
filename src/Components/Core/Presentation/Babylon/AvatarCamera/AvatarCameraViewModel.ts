import { ArcRotateCamera, TransformNode, Vector3 } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AvatarCameraViewModel {
  parentNode: Observable<TransformNode> = new Observable<TransformNode>();
  camera: Observable<ArcRotateCamera> = new Observable<ArcRotateCamera>();

  // camera settings
  //left right angle
  defaultAlphaRotation: number = -(Math.PI / 4);
  //up down angle
  defaultBetaRotation: number = Math.PI * 0.3;
  defaultRadius: number = 15;
  defaultTargetOffset: Vector3 = new Vector3(0, 1, 0);
  lowerRadiusLimit: number = 5;
  upperRadiusLimit: number = 25;
  wheelDeltaPercentage: number = 0.01;
  upperBetaLimit: number = Math.PI / 3;
  rotationButtons: number[] = [0];

  enableUserInput: Observable<boolean> = new Observable<boolean>(true);
}
