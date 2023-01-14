import { injectable } from "inversify";
import ILMSPort from "./ILMSPort";
import ILMSAdapter from "./ILMSAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";

@injectable()
export default class LMSPort
  extends AbstractPort<ILMSAdapter>
  implements ILMSPort
{
  displayLoginModal(): void {
    this.adapters.forEach((adapter) => {
      adapter.displayLoginModal();
    });
  }

  onLoginSuccessful(): void {
    this.adapters.forEach((adapter) => {
      adapter.onLoginSuccessful();
    });
  }
}
