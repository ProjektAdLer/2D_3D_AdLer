import IMoodleLoginButtonPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface IMoodlePort {
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void;
  registerMoodleLoginButtonPresenter(
    presenter: IMoodleLoginButtonPresenter
  ): void;
  displayLoginForm(): void;
  loginSuccessful(): void;
}
