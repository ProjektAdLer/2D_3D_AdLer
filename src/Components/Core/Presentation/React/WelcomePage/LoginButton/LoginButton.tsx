import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LoginButtonController from "./LoginButtonController";
import LoginButtonViewModel from "./LoginButtonViewModel";

import moodleIcon from "../../../../../../Assets/icons/16-moodle/moodle-icon-nobg.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function LoginButton() {
  const [viewModel, controller] = useBuilder<
    LoginButtonViewModel,
    LoginButtonController
  >(BUILDER_TYPES.ILoginButtonBuilder);

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
