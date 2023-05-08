import { ArcRotateCamera, TransformNode } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AvatarCameraViewModel {
  parentNode: Observable<TransformNode> = new Observable<TransformNode>();
  camera: Observable<ArcRotateCamera> = new Observable<ArcRotateCamera>();

  // camera settings
  //left right angle
  defaultAlphaRotation: number = Math.PI / 4;
  //up down angle
  defaultBetaRotation: number = Math.PI * 0.35;
  defaultRadius: number = 15;
  lowerRadiusLimit: number = 5;
  upperRadiusLimit: number = 25;
  wheelDeltaPercentage: number = 0.01;
  upperBetaLimit: number = Math.PI / 3;
  rotationButtons: number[] = [0];
}
