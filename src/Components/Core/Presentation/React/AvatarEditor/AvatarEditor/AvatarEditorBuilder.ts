import { injectable } from "inversify";
import AvatarEditorController from "./AvatarEditorController";
import AvatarEditorPresenter from "./AvatarEditorPresenter";
import IAvatarEditorController from "./IAvatarEditorController";
import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

@injectable()
export default class AvatarEditorBuilder extends PresentationBuilder<
  AvatarEditorViewModel,
  IAvatarEditorController,
  undefined,
  IAvatarEditorPresenter
> {
  constructor() {
    super(
      AvatarEditorViewModel,
      AvatarEditorController,
      undefined,
      AvatarEditorPresenter,
    );
  }
}
