import history from "history/browser";
import { inject, injectable } from "inversify";
import { IAbstractPort } from "../Interfaces/IAbstractPort";
import type ILoggerPort from "../Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import {
  History,
  LocationScope,
} from "~ReactComponents/ReactRelated/ReactEntryPoint/History";
import type { Update } from "history";
import bind from "bind-decorator";

@injectable()
/**
 * The AbstractPort class is a base class for all ports. It provides a basic methods for registering and unregistering adapters.
 */
export default abstract class AbstractPort<T> implements IAbstractPort<T> {
  protected mappedAdapters = new Map<LocationScope, T[]>();

  constructor(@inject(CORE_TYPES.ILogger) private logger: ILoggerPort) {
    history.listen((update: Update) => {
      this.evaluateScope(update);
    });
  }

  @bind
  public registerAdapter(adapter: T, location: LocationScope): void {
    if (!this.mappedAdapters.get(location)) {
      this.mappedAdapters.set(location, []);
    }

    if (!this.mappedAdapters.get(location)!.includes(adapter)) {
      this.mappedAdapters.get(location)!.push(adapter);
    } else {
      this.logger.log(
        LogLevelTypes.WARN,
        'Adapter "' + adapter + '" is already registered with: ' + this
      );
      return;
    }
  }

  @bind
  public unregisterAdapter(adapter: T): void {
    this.mappedAdapters.forEach((ada) => {
      if (ada.includes(adapter)) {
        ada.splice(ada.indexOf(adapter), 1);
      }
    });
  }

  @bind
  private evaluateScope(update: Update) {
    this.mappedAdapters.forEach((value, key) => {
      const notGlobalAndNotSameLocation =
        key !== LocationScope._global && key !== History.currentLocationScope();

      if (notGlobalAndNotSameLocation) {
        this.mappedAdapters.get(key)?.splice(0);
      }
    });
  }
}
