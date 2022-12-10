import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../Ports/LMSPort/ILMSPort";
import IMoodleLoginButtonController from "./IMoodleLoginButtonController";

export default class MoodleLoginButtonController
  implements IMoodleLoginButtonController
{
  displayLoginForm(): void {
    CoreDIContainer.get<ILMSPort>(PORT_TYPES.IMoodlePort).displayLoginForm();
  }
}
