import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import MoodleLoginButtonController from "./MoodleLoginButtonController";
import MoodleLoginButtonViewModel from "./MoodleLoginButtonViewModel";

import moodleIcon from "../../../../../../Assets/icons/moodle-icon.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function MoodleLoginButton() {
  const [viewModel, controller] = useBuilder<
    MoodleLoginButtonViewModel,
    MoodleLoginButtonController
  >(BUILDER_TYPES.IMoodleLoginButtonBuilder);

  const [loginSuccessful] = useObservable<boolean>(viewModel?.loginSuccessful);

  if (!controller || !viewModel) return null;

  return (
    <StyledButton
      color={loginSuccessful ? "success" : "default"}
      onClick={() => {
        controller.displayLoginForm();
      }}
    >
      <img src={moodleIcon} alt="Moodle-Icon"></img>
    </StyledButton>
  );
}
