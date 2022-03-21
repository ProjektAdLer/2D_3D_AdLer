import Observable from "../../Entities/API/Observable";
import IObservableClass from "./IObservableClass";
import ObservableBaseClass from "./ObservableBaseClass";

export default class ObservableClass<T>
  extends ObservableBaseClass<T>
  implements IObservableClass<T>
{
  constructor(type: { new (): T }) {
    super();
    this.data = new type();
    for (const [key, value] of Object.entries(this.data)) {
      if (value instanceof Observable) console.log(key);
    }
  }
}
