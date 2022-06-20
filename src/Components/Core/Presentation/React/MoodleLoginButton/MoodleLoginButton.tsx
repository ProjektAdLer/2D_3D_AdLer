import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import MoodleLoginButtonController from "./MoodleLoginButtonController";
import MoodleLoginButtonViewModel from "./MoodleLoginButtonViewModel";

export default function MoodleLoginButton() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    MoodleLoginButtonViewModel,
    MoodleLoginButtonController
  >(MoodleLoginButtonViewModel);

  const [loginSuccessful, setLoginSuccessful] = useObservable<boolean>(
    viewModels[0]?.loginSuccessful
  );
  return (
    <StyledButton
      onClick={() => {
        controllers[0].displayLoginForm();
      }}
    >
      <img
        className="w-10"
        src="icons/moodle-icon.svg"
        style={loginSuccessful ? { background: "green" } : {}}
      ></img>
    </StyledButton>
  );
}
