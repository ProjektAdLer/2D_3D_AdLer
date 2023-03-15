import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import { IAbstractPort } from "../Interfaces/IAbstractPort";

@injectable()
/**
 * The AbstractPort class is a base class for all ports. It provides a basic methods for registering and unregistering adapters.
 */
export default abstract class AbstractPort<T> implements IAbstractPort<T> {
  protected adapters: T[] = [];

  public registerAdapter(adapter: T): void {
    if (this.adapters.includes(adapter)) {
      logger.warn(
        'Adapter "' + adapter + '" is already registered with: ' + this
      );
      return;
    }
    this.adapters.push(adapter);
  }

  public unregisterAdapter(adapter: T): void {
    if (this.adapters.includes(adapter))
      this.adapters.splice(this.adapters.indexOf(adapter), 1);
  }
}
