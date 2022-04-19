export default abstract class Observable<T> {
  protected value: T;
  protected subscribers: ((value: T) => void)[] = [];

  public subscribe(fn: (value: T) => void): void {
    this.subscribers.push(fn);
  }

  public unsubscribe(fn: (value: T) => void): void {
    this.subscribers = this.subscribers.filter((subscriber) => {
      return subscriber !== fn;
    });
  }

  protected notify(data: T): void {
    this.subscribers.forEach((fn) => {
      fn(data);
    });
  }

  get Value(): T {
    return this.value;
  }
}
