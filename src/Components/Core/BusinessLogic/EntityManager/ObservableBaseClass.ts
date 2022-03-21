import IObservableBaseClass from "./IObservableBaseClass";

export default abstract class ObservableBaseClass<T>
  implements IObservableBaseClass<T>
{
  data: T;
  subscribers: ((data: T) => void)[];
  subscribe(fn: (data: T) => void): void {
    throw new Error("Method not implemented.");
  }
  unsubscribe(fn: (data: T) => void): void {
    throw new Error("Method not implemented.");
  }
  notify(data: T): void {
    throw new Error("Method not implemented.");
  }
  getData(): T {
    throw new Error("Method not implemented.");
  }
}
