import IWorldMenuButtonPresenter from "~ReactComponents/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";
import IMoodleLoginButtonPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface IMoodlePort {
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void;
  registerMoodleLoginButtonPresenter(
    presenter: IMoodleLoginButtonPresenter
  ): void;
  registerWorldMenuButtonPresenter(presenter: IWorldMenuButtonPresenter): void;
  displayLoginForm(): void;
  loginSuccessful(): void;
}
