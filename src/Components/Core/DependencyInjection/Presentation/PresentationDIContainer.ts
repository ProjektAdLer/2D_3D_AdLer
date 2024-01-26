import { ContainerModule } from "inversify";
import IMovementIndicator from "../../Presentation/Babylon/MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "./PRESENTATION_TYPES";
import MovementIndicator from "../../Presentation/Babylon/MovementIndicator/MovementIndicator";
import ICharacterAnimator from "../../Presentation/Babylon/CharacterAnimator/ICharacterAnimator";
import CharacterAnimator from "../../Presentation/Babylon/CharacterAnimator/CharacterAnimator";
import ICharacterNavigator from "../../Presentation/Babylon/CharacterNavigator/ICharacterNavigator";
import CharacterNavigator from "../../Presentation/Babylon/CharacterNavigator/CharacterNavigator";
import IAvatarCameraPresenter from "../../Presentation/Babylon/AvatarCamera/IAvatarCameraPresenter";
import AvatarCameraPresenter from "../../Presentation/Babylon/AvatarCamera/AvatarCameraPresenter";

const PresentationDIContainer = new ContainerModule((bind) => {
  bind<IMovementIndicator>(PRESENTATION_TYPES.IMovementIndicator).to(
    MovementIndicator
  );
  bind<ICharacterAnimator>(PRESENTATION_TYPES.ICharacterAnimator).to(
    CharacterAnimator
  );
  bind<ICharacterNavigator>(PRESENTATION_TYPES.ICharacterNavigator).to(
    CharacterNavigator
  );
  bind<IAvatarCameraPresenter>(PRESENTATION_TYPES.IAvatarCameraPresenter).to(
    AvatarCameraPresenter
  );
});

export default PresentationDIContainer;
