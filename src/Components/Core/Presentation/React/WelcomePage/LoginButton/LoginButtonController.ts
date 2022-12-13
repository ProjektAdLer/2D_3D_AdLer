import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../Ports/LMSPort/ILMSPort";
import ILoginButtonController from "./ILoginButtonController";

export default class LoginButtonController implements ILoginButtonController {
  displayLoginForm(): void {
    CoreDIContainer.get<ILMSPort>(PORT_TYPES.ILMSPort).displayLoginModal();
  }
}
