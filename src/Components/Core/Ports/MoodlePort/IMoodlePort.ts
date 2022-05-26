import IMoodleLoginFormPresenter from "../../Presentation/React/ReactAdvancedComponents/MoodleLoginForm/IMoodleLoginFormPresenter";

export default interface IMoodlePort {
  registerMoodleLoginPresenter(presenter: IMoodleLoginFormPresenter): void;
  debug_DisplayUserToken(userToken: string): void;
}
