export default interface IObservable<T> {
  data: T;
  subscribers: Array<(data: T) => void>;
  subscribe(fn: (data: T) => void): void;
  unsubscribe(fn: (data: T) => void): void;
  notify(data: T): void;
  get Data(): T;
}
