export default class Observable<T> {
  constructor(data?: T) {
    if (data) {
      this.data = data;
    }
  }
  private data: T;
  private subscribers: Array<(data: T) => void> = [];

  public subscribe(fn: (data: T) => void): void {
    this.subscribers.push(fn);
  }

  public unsubscribe(fn: (data: T) => void): void {
    this.subscribers = this.subscribers.filter((subscriber) => {
      return subscriber !== fn;
    });
  }

  public notify(data: T): void {
    this.subscribers.forEach((fn) => {
      fn(data);
    });
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
    this.notify(data);
  }
}
