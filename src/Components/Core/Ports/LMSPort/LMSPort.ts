import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import ILoginButtonPresenter from "../../Presentation/React/WelcomePage/LoginButton/ILoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";
import ILMSPort from "./ILMSPort";
import IWorldMenuButtonPresenter from "../../Presentation/React/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";

@injectable()
export default class LMSPort implements ILMSPort {
  private moodleLoginFormPresenter: IMoodleLoginFormPresenter;
  private loginButtonPresenter: ILoginButtonPresenter;
  private worldMenuButtonPresenter: IWorldMenuButtonPresenter;

  displayLoginForm(): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodleLoginFormPresenter is not registered");

    this.moodleLoginFormPresenter.displayLoginForm();
  }

  loginMoodleSuccessful(): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodleLoginFormPresenter is not registered");
    if (!this.loginButtonPresenter)
      throw new Error("LoginButtonPresenter is not registered");
    if (!this.worldMenuButtonPresenter)
      throw new Error("WorldMenuButtonPresenter is not registered");

    this.moodleLoginFormPresenter.setLoginSuccessful();
    this.loginButtonPresenter.setLoginSuccessful();
    this.worldMenuButtonPresenter.setLoginSuccessful();
  }

  // setter for presenters
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void {
    if (this.moodleLoginFormPresenter)
      logger.warn("MoodleLoginFormPresenter is already registered");
    this.moodleLoginFormPresenter = presenter;
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
