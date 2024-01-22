import { ContainerModule } from "inversify";
import IMovementIndicator from "../../Presentation/Babylon/MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "./PRESENTATION_TYPES";
import MovementIndicator from "../../Presentation/Babylon/MovementIndicator/MovementIndicator";
import IAvatarCameraPresenter from "../../Presentation/Babylon/AvatarCamera/IAvatarCameraPresenter";
import AvatarCameraPresenter from "../../Presentation/Babylon/AvatarCamera/AvatarCameraPresenter";

const PresentationDIContainer = new ContainerModule((bind) => {
  bind<IMovementIndicator>(PRESENTATION_TYPES.IMovementIndicator).to(
    MovementIndicator
  );
  bind<IAvatarCameraPresenter>(PRESENTATION_TYPES.IAvatarCameraPresenter).to(
    AvatarCameraPresenter
  );
});

export default PresentationDIContainer;
