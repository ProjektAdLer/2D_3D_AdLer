import { injectable } from "inversify";
import ILMSPort from "../Interfaces/ILMSPort";
import ILMSAdapter from "./ILMSAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";

@injectable()
export default class LMSPort
  extends AbstractPort<ILMSAdapter>
  implements ILMSPort
{
  onLoginSuccessful(userName: string): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLoginSuccessful) {
        adapter.onLoginSuccessful(userName);
      }
    });
  }

  onLogoutSuccessful(): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLogoutSuccessful) {
        adapter.onLogoutSuccessful();
      }
    });
  }
}
