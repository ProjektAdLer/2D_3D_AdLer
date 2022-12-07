import { ArcRotateCamera, TransformNode } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AvatarCameraViewModel {
  parentNode: Observable<TransformNode> = new Observable<TransformNode>();
  camera: Observable<ArcRotateCamera> = new Observable<ArcRotateCamera>();

  // camera settings
  defaultAlphaRotation: number = Math.PI / 4;
  defaultBetaRotation: number = Math.PI / 4;
  defaultRadius: number = 20;
  lowerRadiusLimit: number = 5;
  upperRadiusLimit: number = 30;
  wheelDeltaPercentage: number = 0.01;
  upperBetaLimit: number = Math.PI / 2;
  rotationButtons: number[] = [0];
}
