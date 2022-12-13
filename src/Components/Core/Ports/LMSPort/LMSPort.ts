import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import ILoginButtonPresenter from "../../Presentation/React/WelcomePage/LoginButton/ILoginButtonPresenter";
import ILoginModalPresenter from "../../Presentation/React/GeneralComponents/LoginModal/ILoginModalPresenter";
import ILMSPort from "./ILMSPort";
import IWorldMenuButtonPresenter from "../../Presentation/React/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";

@injectable()
export default class LMSPort implements ILMSPort {
  private loginModalPresenter: ILoginModalPresenter;
  private loginButtonPresenter: ILoginButtonPresenter;
  private worldMenuButtonPresenter: IWorldMenuButtonPresenter;

  displayLoginModal(): void {
    if (!this.loginModalPresenter)
      throw new Error("LoginModalPresenter is not registered");

    this.loginModalPresenter.displayLoginForm();
  }

  loginSuccessful(): void {
    if (!this.loginModalPresenter)
      throw new Error("LoginModalPresenter is not registered");
    if (!this.loginButtonPresenter)
      throw new Error("LoginButtonPresenter is not registered");
    if (!this.worldMenuButtonPresenter)
      throw new Error("WorldMenuButtonPresenter is not registered");

    this.loginModalPresenter.setLoginSuccessful();
    this.loginButtonPresenter.setLoginSuccessful();
    this.worldMenuButtonPresenter.setLoginSuccessful();
  }

  // setter for presenters
  registerLoginModalPresenter(presenter: ILoginModalPresenter): void {
    if (this.loginModalPresenter)
      logger.warn("LoginModalPresenter is already registered");
    this.loginModalPresenter = presenter;
  }

  registerLoginButtonPresenter(presenter: ILoginButtonPresenter): void {
    if (this.loginButtonPresenter)
      logger.warn("LoginButtonPresenter is already registered");
    this.loginButtonPresenter = presenter;
  }
  registerWorldMenuButtonPresenter(presenter: IWorldMenuButtonPresenter): void {
    if (this.worldMenuButtonPresenter)
      logger.warn("WorldMenuButtonPresenter is already registered");
    this.worldMenuButtonPresenter = presenter;
  }
}
