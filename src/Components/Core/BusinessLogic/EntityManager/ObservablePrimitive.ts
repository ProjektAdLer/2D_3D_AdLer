import IObservablePrimitive from "./IObservablePrimitive";
import ObservableBaseClass from "./ObservableBaseClass";

export default class ObservablePrimitive<T>
  extends ObservableBaseClass<T>
  implements IObservablePrimitive<T>
{
  setValue(value: T): void {
    this.data = value;
    this.notify(value);
  }
}
