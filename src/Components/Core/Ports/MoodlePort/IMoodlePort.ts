import IMoodleLoginButtonPresenter from "../../Presentation/React/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface IMoodlePort {
  registerMoodleLoginPresenter(presenter: IMoodleLoginFormPresenter): void;
  registerMoodleLoginButtonPresenter(
    presenter: IMoodleLoginButtonPresenter
  ): void;
  displayLoginForm(): void;
  loginSuccessful(): void;
  debug_DisplayUserToken(userToken: string): void;
}
