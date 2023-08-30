import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import AvatarController from "./AvatarController";
import AvatarView from "./AvatarView";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";
import IAvatarPresenter from "./IAvatarPresenter";
import { Vector3 } from "@babylonjs/core";
import {
  Transform,
  Point,
} from "src/Components/Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";

export default class AvatarBuilder extends AsyncPresentationBuilder<
  AvatarViewModel,
  IAvatarController,
  AvatarView,
  IAvatarPresenter
> {
  playerSpawnPoint: Transform | undefined;
  constructor() {
    super(AvatarViewModel, AvatarController, AvatarView, undefined);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    if (this.playerSpawnPoint === undefined) {
      let nullSpawnPoint = {
        position: { x: 0, y: 0 } as Point,
        orientation: { rotation: 0 },
      };
      this.viewModel!.spawnPoint = nullSpawnPoint;
    } else this.viewModel!.spawnPoint = this.playerSpawnPoint;
  }

  override buildPresenter(): void {
    // create presenter via DI because it also acts as port for the avatar
    this.presenter = CoreDIContainer.get<IAvatarPresenter>(
      PORT_TYPES.IAvatarPort
    );
    this.presenter.ViewModel = this.viewModel!;

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter);
  }

  override buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e)
    );
  }
}
