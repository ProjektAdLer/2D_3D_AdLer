import ILMSAdapter from "./ILMSAdapter";
import { IAbstractPort } from "./../AbstractPort/IAbstractPort";

export default interface ILMSPort extends IAbstractPort<ILMSAdapter> {
  displayLoginModal(): void;
  onLoginSuccessful(): void;
}
