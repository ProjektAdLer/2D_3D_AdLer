import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import IMoodleLoginButtonPresenter from "../../Presentation/React/WelcomePage/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";
import ILMSPort from "./ILMSPort";
import IWorldMenuButtonPresenter from "../../Presentation/React/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";

@injectable()
export default class LMSPort implements ILMSPort {
  private moodleLoginFormPresenter: IMoodleLoginFormPresenter;
  private moodleLoginButtonPresenter: IMoodleLoginButtonPresenter;
  private worldMenuButtonPresenter: IWorldMenuButtonPresenter;

  displayLoginForm(): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodleLoginFormPresenter is not registered");

    this.moodleLoginFormPresenter.displayLoginForm();
  }

  loginMoodleSuccessful(): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodleLoginFormPresenter is not registered");
    if (!this.moodleLoginButtonPresenter)
      throw new Error("MoodleLoginButtonPresenter is not registered");
    if (!this.worldMenuButtonPresenter)
      throw new Error("WorldMenuButtonPresenter is not registered");

    this.moodleLoginFormPresenter.setLoginSuccessful();
    this.moodleLoginButtonPresenter.setLoginSuccessful();
    this.worldMenuButtonPresenter.setLoginSuccessful();
  }

  // setter for presenters
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void {
    if (this.moodleLoginFormPresenter)
      logger.warn("MoodleLoginFormPresenter is already registered");
    this.moodleLoginFormPresenter = presenter;
  }

  registerMoodleLoginButtonPresenter(
    presenter: IMoodleLoginButtonPresenter
  ): void {
    if (this.moodleLoginButtonPresenter)
      logger.warn("MoodleLoginButtonPresenter is already registered");
    this.moodleLoginButtonPresenter = presenter;
  }
  registerWorldMenuButtonPresenter(presenter: IWorldMenuButtonPresenter): void {
    if (this.worldMenuButtonPresenter)
      logger.warn("WorldMenuButtonPresenter is already registered");
    this.worldMenuButtonPresenter = presenter;
  }
}
