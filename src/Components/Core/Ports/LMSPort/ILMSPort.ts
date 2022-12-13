import IWorldMenuButtonPresenter from "~ReactComponents/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";
import ILoginButtonPresenter from "../../Presentation/React/WelcomePage/LoginButton/ILoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface ILMSPort {
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void;
  registerLoginButtonPresenter(presenter: ILoginButtonPresenter): void;
  registerWorldMenuButtonPresenter(presenter: IWorldMenuButtonPresenter): void;
  displayLoginForm(): void;
  loginMoodleSuccessful(): void;
}
