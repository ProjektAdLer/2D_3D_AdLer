import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";

export default class AvatarEditorPresenter implements IAvatarEditorPresenter {
  constructor(private viewModel: AvatarEditorViewModel) {}
}
