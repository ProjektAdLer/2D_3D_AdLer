import IWorldMenuButtonPresenter from "~ReactComponents/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";
import IMoodleLoginButtonPresenter from "../../Presentation/React/WelcomePage/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface ILMSPort {
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void;
  registerMoodleLoginButtonPresenter(
    presenter: IMoodleLoginButtonPresenter
  ): void;
  registerWorldMenuButtonPresenter(presenter: IWorldMenuButtonPresenter): void;
  displayLoginForm(): void;
  loginMoodleSuccessful(): void;
}
