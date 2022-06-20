import { injectable } from "inversify";
import IMoodleLoginFormPresenter from "../../Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";
import IMoodlePort from "./IMoodlePort";

@injectable()
export default class MoodlePort implements IMoodlePort {
  private moodleLoginFormPresenter: IMoodleLoginFormPresenter;
  displayLoginForm = () => {
    this.moodleLoginFormPresenter.displayLoginForm();
  };
  loginSuccessful(): void {
    this.moodleLoginFormPresenter.loginSuccessful();
  }
  registerMoodleLoginPresenter(presenter: IMoodleLoginFormPresenter): void {
    if (this.moodleLoginFormPresenter)
      throw new Error("MoodlePort is already registered");
    this.moodleLoginFormPresenter = presenter;
  }

  debug_DisplayUserToken(userToken: string): void {
    if (!this.moodleLoginFormPresenter)
      throw new Error("MoodlePort is not registered");
    this.moodleLoginFormPresenter.debug_DisplayUserToken(userToken);
  }
}
