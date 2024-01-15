import ILMSAdapter from "../LMSPort/ILMSAdapter";
import { IAbstractPort } from "./IAbstractPort";

export default interface ILMSPort extends IAbstractPort<ILMSAdapter> {
  onLoginSuccessful(userName: string): void;
  onLoginFailure(errorMessage: string, errorMessageAdvise: string): void;
  onLogoutSuccessful(): void;
}
