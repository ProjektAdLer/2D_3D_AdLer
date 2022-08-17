import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import MoodleLoginButtonController from "./MoodleLoginButtonController";
import MoodleLoginButtonViewModel from "./MoodleLoginButtonViewModel";

import moodleIcon from "../../../../../Assets/icons/moodle-icon.svg";

export default function MoodleLoginButton() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    MoodleLoginButtonViewModel,
    MoodleLoginButtonController
  >(MoodleLoginButtonViewModel);

  const [loginSuccessful] = useObservable<boolean>(
    viewModels[0]?.loginSuccessful
  );

  return (
    <StyledButton
      color={loginSuccessful ? "login" : "default"}
      onClick={() => {
        controllers[0].displayLoginForm();
      }}
    >
      <img src={moodleIcon} alt="Moodle-Logo"></img>
    </StyledButton>
  );
}
