import { injectable } from "inversify";
import IMoodleLoginFormPresenter from "../../React/ReactAdvancedComponents/MoodleLoginForm/IMoodleLoginFormPresenter";
import IMoodlePort from "./IMoodlePort";

@injectable()
export default class MoodlePort implements IMoodlePort {
  private moodleLoginFormPresenter: IMoodleLoginFormPresenter;
  registerMoodleLoginPresenter(presenter: IMoodleLoginFormPresenter): void {
    if (this.moodleLoginFormPresenter)
      throw new Error("MoodlePort is already registered");
    this.moodleLoginFormPresenter = presenter;
  }
}
