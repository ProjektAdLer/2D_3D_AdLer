import { injectable } from "inversify";
import ILMSPort from "../../Application/Ports/Interfaces/ILMSPort";
import ILMSAdapter from "./ILMSAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";

@injectable()
export default class LMSPort
  extends AbstractPort<ILMSAdapter>
  implements ILMSPort
{
  onLoginSuccessful(): void {
    this.adapters.forEach((adapter) => {
      adapter.onLoginSuccessful();
    });
  }
}
