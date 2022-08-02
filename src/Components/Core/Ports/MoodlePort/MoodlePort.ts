import { injectable } from "inversify";
import IMoodleLoginButtonPresenter from "../../Presentation/React/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";
import IMoodlePort from "./IMoodlePort";

@injectable()
export default class MoodlePort implements IMoodlePort {
  private moodleLoginFormPresenter: IMoodleLoginFormPresenter;
  private moodleLoginButtonPresenter: IMoodleLoginButtonPresenter;

  displayLoginForm(): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodleLoginFormPresenter is not registered");

    this.moodleLoginFormPresenter.displayLoginForm();
  }

  loginSuccessful(): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodleLoginFormPresenter is not registered");
    if (!this.moodleLoginButtonPresenter)
      throw new Error("MoodleLoginButtonPresenter is not registered");

    this.moodleLoginFormPresenter.loginSuccessful();
    this.moodleLoginButtonPresenter.setLoginSuccessful();
  }

  // setter for presenters
  registerMoodleLoginFormPresenter(presenter: IMoodleLoginFormPresenter): void {
    if (this.moodleLoginFormPresenter)
      throw new Error("MoodlePort is already registered");
    this.moodleLoginFormPresenter = presenter;
  }

  registerMoodleLoginButtonPresenter(
    presenter: IMoodleLoginButtonPresenter
  ): void {
    if (this.moodleLoginButtonPresenter)
      throw new Error("MoodlePort is already registered");
    this.moodleLoginButtonPresenter = presenter;
  }
}
