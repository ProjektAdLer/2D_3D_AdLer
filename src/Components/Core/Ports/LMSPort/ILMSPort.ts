import IWorldMenuButtonPresenter from "~ReactComponents/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";
import ILoginButtonPresenter from "../../Presentation/React/WelcomePage/LoginButton/ILoginButtonPresenter";
import ILoginModalPresenter from "../../Presentation/React/GeneralComponents/LoginModal/ILoginModalPresenter";

export default interface ILMSPort {
  registerLoginModalPresenter(presenter: ILoginModalPresenter): void;
  registerLoginButtonPresenter(presenter: ILoginButtonPresenter): void;
  registerWorldMenuButtonPresenter(presenter: IWorldMenuButtonPresenter): void;
  displayLoginForm(): void;
  loginMoodleSuccessful(): void;
}
