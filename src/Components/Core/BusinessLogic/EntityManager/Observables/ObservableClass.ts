import Observable from "./Observable";

export default class ObservableClass<T> extends Observable<T> {
  constructor(type: { new (): T }) {
    super();
    this.value = new type();

    // This is for getting notified, when one of the members changes - PG
    for (const [key, value] of Object.entries(this.value)) {
      if (value instanceof Observable)
        value.subscribe(() => this.notify(this.value));
    }
  }
}
