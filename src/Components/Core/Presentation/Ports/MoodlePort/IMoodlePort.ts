import IMoodleLoginFormPresenter from "../../React/ReactAdvancedComponents/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface IMoodlePort {
  registerMoodleLoginPresenter(presenter: IMoodleLoginFormPresenter): void;
}
