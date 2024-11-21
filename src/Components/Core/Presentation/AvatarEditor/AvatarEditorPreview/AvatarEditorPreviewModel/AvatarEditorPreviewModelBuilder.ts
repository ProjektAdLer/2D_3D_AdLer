import { injectable } from "inversify";
import AvatarEditorPreviewModelPresenter from "./AvatarEditorPreviewModelPresenter";
import IAvatarEditorPreviewModelPresenter from "./IAvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import AvatarEditorPreveiwModelView from "./AvatarEditorPreviewModelView";
import AsyncPresentationBuilder from "../../../PresentationBuilder/AsyncPresentationBuilder";

@injectable()
export default class AvatarEditorPreviewModelBuilder extends AsyncPresentationBuilder<
  AvatarEditorPreviewModelViewModel,
  undefined,
  AvatarEditorPreveiwModelView,
  IAvatarEditorPreviewModelPresenter
> {
  constructor() {
    super(
      AvatarEditorPreviewModelViewModel,
      undefined,
      AvatarEditorPreveiwModelView,
      AvatarEditorPreviewModelPresenter,
    );
  }

  buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e),
    );
  }
}
