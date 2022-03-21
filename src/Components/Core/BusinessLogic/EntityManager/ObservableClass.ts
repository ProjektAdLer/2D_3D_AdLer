import IObservableClass from "./IObservableClass";
import ObservableBaseClass from "./ObservableBaseClass";

export default class ObservableClass<T>
  extends ObservableBaseClass<T>
  implements IObservableClass<T> {}
