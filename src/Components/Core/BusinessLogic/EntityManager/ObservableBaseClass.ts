import IObservableBaseClass from "./IObservableBaseClass";

export default abstract class ObservableBaseClass<T>
  implements IObservableBaseClass<T>
{
  data: T;
  subscribers: ((data: T) => void)[] = [];
  public subscribe(fn: (data: T) => void): void {
    this.subscribers.push(fn);
  }

  public unsubscribe(fn: (data: T) => void): void {
    this.subscribers = this.subscribers.filter((subscriber) => {
      return subscriber !== fn;
    });
  }

  notify(data: T): void {
    this.subscribers.forEach((fn) => {
      fn(data);
    });
  }

  getData(): T {
    return this.data;
  }
}
