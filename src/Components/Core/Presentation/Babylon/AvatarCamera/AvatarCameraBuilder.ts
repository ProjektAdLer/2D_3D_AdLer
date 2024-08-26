import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import AvatarCameraController from "./AvatarCameraController";
import IAvatarCameraController from "./IAvatarCameraController";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import AvatarCameraView from "./AvatarCameraView";
import IAvatarCameraPresenter from "./IAvatarCameraPresenter";
import AvatarCameraPresenter from "./AvatarCameraPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

@injectable()
export default class AvatarCameraBuilder extends PresentationBuilder<
  AvatarCameraViewModel,
  IAvatarCameraController,
  AvatarCameraView,
  IAvatarCameraPresenter
> {
  constructor() {
    super(
      AvatarCameraViewModel,
      AvatarCameraController,
      AvatarCameraView,
      AvatarCameraPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IAvatarCameraPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IAvatarCameraPresenter);
    }

    CoreDIContainer.bind<IAvatarCameraPresenter>(
      PRESENTATION_TYPES.IAvatarCameraPresenter
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
