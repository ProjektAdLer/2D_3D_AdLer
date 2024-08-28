export interface IAbstractPort<T> {
  registerAdapter(adapter: T): void;
  unregisterAdapter(adapter: T): void;
}
