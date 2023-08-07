import { injectable } from "inversify";
import { IAbstractPort } from "../Interfaces/IAbstractPort";
// import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
// import ILoggerPort from "../Interfaces/ILoggerPort";
// import CORE_TYPES from "~DependencyInjection/CoreTypes";
// import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
/**
 * The AbstractPort class is a base class for all ports. It provides a basic methods for registering and unregistering adapters.
 */
export default abstract class AbstractPort<T> implements IAbstractPort<T> {
  protected adapters: T[] = [];

  // private logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  public registerAdapter(adapter: T): void {
    if (this.adapters.includes(adapter)) {
      // this.logger.log(
      //   LogLevelTypes.WARN,
      //   'Adapter "' + adapter + '" is already registered with: ' + this
      // );
      console.warn(
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
