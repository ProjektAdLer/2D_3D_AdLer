import { injectable } from "inversify";
import IMoodleLoginButtonPresenter from "../../Presentation/React/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";
import IMoodlePort from "./IMoodlePort";

@injectable()
export default class MoodlePort implements IMoodlePort {
  private moodleLoginFormPresenter: IMoodleLoginFormPresenter;
  private moodleLoginButtonPresenter: IMoodleLoginButtonPresenter;
  displayLoginForm = () => {
    this.moodleLoginFormPresenter.displayLoginForm();
  };
  loginSuccessful(): void {
    this.moodleLoginFormPresenter.loginSuccessful();
    this.moodleLoginButtonPresenter.setLoginSuccessful();
  }

  debug_DisplayUserToken(userToken: string): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodlePort is not registered");
    this.moodleLoginFormPresenter.debug_DisplayUserToken(userToken);
  }

  //Setter for Presenters

  registerMoodleLoginPresenter(presenter: IMoodleLoginFormPresenter): void {
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
