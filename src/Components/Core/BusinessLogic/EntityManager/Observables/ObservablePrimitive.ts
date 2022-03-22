import Observable from "./Observable";

export default class ObservablePrimitive<T> extends Observable<T> {
  constructor(value?: T) {
    super();
    if (value) this.value = value;
  }

  set Value(value: T) {
    this.value = value;
    this.notify(value);
  }
}
