import IObservableClass from "./IObservableClass";
import ObservableBaseClass from "./ObservableBaseClass";

export default class ObservableClass<T>
  extends ObservableBaseClass<T>
  implements IObservableClass<T>
{
  constructor(type: { new (): T }) {
    super();
    this.data = new type();

    // This is for getting notified, when one of the members changes - PG
    for (const [key, value] of Object.entries(this.data)) {
      if (value instanceof ObservableBaseClass)
        value.subscribe(() => this.notify(this.data));
    }
  }
}
