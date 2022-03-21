import IObservablePrimitive from "./IObservablePrimitive";
import ObservableBaseClass from "./ObservableBaseClass";

export default class ObservablePrimitive<T>
  extends ObservableBaseClass<T>
  implements IObservablePrimitive<T>
{
  constructor(value: T) {
    super();
    this.data = value;
  }

  setValue(value: T): void {
    this.data = value;
    this.notify(value);
  }
}
