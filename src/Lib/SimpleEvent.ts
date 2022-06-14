export default class SimpleEvent {
  protected subscribers: (() => void)[] = [];

  public subscribe(fn: () => void): void {
    if (!this.subscribers.includes(fn)) {
      this.subscribers.push(fn);
    }
  }

  public unsubscribe(fn: () => void): void {
    this.subscribers = this.subscribers.filter((subscriber) => {
      return subscriber !== fn;
    });
  }

  public notifySubscribers(): void {
    this.subscribers.forEach((fn) => {
      fn();
    });
  }
}
