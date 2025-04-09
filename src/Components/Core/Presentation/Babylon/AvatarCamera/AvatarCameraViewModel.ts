import { ArcRotateCamera, TransformNode, Vector3 } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AvatarCameraViewModel {
  parentNode: Observable<TransformNode> = new Observable<TransformNode>();
  camera: Observable<ArcRotateCamera> = new Observable<ArcRotateCamera>();
  zoomPercentage: number = 0;
  preZoomRadius: number;

  // camera settings
  //left right angle
  readonly defaultAlphaRotation: number = -(Math.PI / 4);
  //up down angle
  readonly defaultBetaRotation: number = Math.PI * 0.3;
  readonly defaultRadius: number = 15;
  readonly defaultTargetOffset: Vector3 = new Vector3(0, 1, 0);
  readonly lowerRadiusLimit: number = 5;
  readonly upperRadiusLimit: number = 20;
  readonly wheelDeltaPercentage: number = 0.01;
  readonly rotationButtons: number[] = [1];
  readonly alphaLimitOffset: number = Math.PI / 4;
  readonly rotationSesibility: number = 3000;

  enableUserInput: Observable<boolean> = new Observable<boolean>(true);
}
