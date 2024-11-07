import { ArcRotateCamera, Vector3 } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AvatarEditorPreviewCameraViewModel {
  // Camera Parameters
  readonly defaultBetaRotation = Math.PI / 2;
  readonly defaultAlphaRotation = Math.PI / 2;
  readonly lowerRadiusLimit = 1;
  readonly upperRadiusLimit = 3;
  readonly nearClippingPlane = 0;
  readonly zoomedOutTarget = new Vector3(0, -0.2, 0);
  readonly zoomedInTarget = new Vector3(0, 0.5, 0);
  readonly wheelDeltaPercentage = 0.01;

  camera: Observable<ArcRotateCamera> = new Observable<ArcRotateCamera>();
}
