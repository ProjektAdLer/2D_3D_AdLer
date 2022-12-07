import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import AvatarCameraController from "./AvatarCameraController";
import IAvatarCameraController from "./IAvatarCameraController";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import AvatarCameraView from "./AvatarCameraView";

@injectable()
export default class AvatarCameraBuilder extends PresentationBuilder<
  AvatarCameraViewModel,
  IAvatarCameraController,
  AvatarCameraView,
  undefined
> {
  constructor() {
    super(
      AvatarCameraViewModel,
      AvatarCameraController,
      AvatarCameraView,
      undefined
    );
  }
}
