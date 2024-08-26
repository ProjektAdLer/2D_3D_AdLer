import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

export interface IAbstractPort<T> {
  registerAdapter(adapter: T, location: LocationScope): void;
  unregisterAdapter(adapter: T): void;
}
