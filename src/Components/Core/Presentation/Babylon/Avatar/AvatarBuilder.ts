import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import AvatarController from "./AvatarController";
import AvatarView from "./AvatarView";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarBuilder extends PresentationBuilder<
  AvatarViewModel,
  IAvatarController,
  AvatarView,
  IAvatarController
> {
  constructor() {
    super(AvatarViewModel, AvatarController, AvatarView, AvatarController);
  }
}
