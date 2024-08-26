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
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLoginSuccessful) {
          value.onLoginSuccessful(userName);
        }
      });
    });
  }

  onLoginFailure(errorMessage: string, errorMessageAdvise: string): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLoginFailure) {
          value.onLoginFailure(errorMessage, errorMessageAdvise);
        }
      });
    });
  }

  onLogoutSuccessful(): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLogoutSuccessful) {
          value.onLogoutSuccessful();
        }
      });
    });
  }
}
