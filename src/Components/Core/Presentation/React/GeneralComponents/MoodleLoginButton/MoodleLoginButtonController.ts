import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IMoodlePort from "../../../../Ports/MoodlePort/IMoodlePort";
import IMoodleLoginButtonController from "./IMoodleLoginButtonController";

export default class MoodleLoginButtonController
  implements IMoodleLoginButtonController
{
  displayLoginForm(): void {
    CoreDIContainer.get<IMoodlePort>(PORT_TYPES.IMoodlePort).displayLoginForm();
  }
}
