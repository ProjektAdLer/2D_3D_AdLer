import { injectable } from "inversify";
import ILMSPort from "../Interfaces/ILMSPort";
import ILMSAdapter from "./ILMSAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import bind from "bind-decorator";

@injectable()
export default class LMSPort
  extends AbstractPort<ILMSAdapter>
  implements ILMSPort
{
  @bind
  name(): string {
    return "LMS-PORT";
  }

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
