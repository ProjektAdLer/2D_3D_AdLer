import AbstractEntity from "../../../../../../Legacy/AbstractEntity";
import AbstractObservable from "./AbstractObservable";

export default class ObservableClass<
  T extends AbstractEntity
> extends AbstractObservable<T> {
  constructor(type: { new (): T }) {
    super();
    this.value = new type();

    // This is for getting notified, when one of the members changes - PG
    for (const [, value] of Object.entries(this.value)) {
      if (value instanceof AbstractObservable)
        value.subscribe(() => this.notify(this.value));
    }
  }
}
