import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarController implements IAvatarController {
  constructor(private viewModel: AvatarViewModel) {}
}
