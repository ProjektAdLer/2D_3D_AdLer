import {
  Mesh,
  Nullable,
  Texture,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import Observable from "src/Lib/Observable";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";

export default class AvatarViewModel {
  public characterNavigator: ICharacterNavigator;
  public characterAnimator: ICharacterAnimator;

  public meshes: Mesh[];

  // transform
  public parentNode: TransformNode;
  public learningSpaceTemplateType: LearningSpaceTemplateType;

  // blink animation
  public readonly blinkTextureUOffset: number = 0.21;
  public readonly blinkDuration: number = 200; // in ms
  public readonly blinkInterval: number = 4000; // in ms
  public readonly blinkIntervalMaxOffset: number = 2000; // in ms (random offset up to this value is added to blinkInterval)
  public eyeTextures: Texture[];

  // navigation
  public readonly pointerMovementThreshold: number = 0.7;
  public movementTarget: Observable<Nullable<Vector3>> = new Observable<
    Nullable<Vector3>
  >(null);
}
