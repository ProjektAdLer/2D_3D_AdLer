import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

export interface IAbstractPort<T> {
  registerAdapter(adapter: T, location: LocationScope): void;
  unregisterAdapter(adapter: T): void;
  name(): string; // debug purposes
}
