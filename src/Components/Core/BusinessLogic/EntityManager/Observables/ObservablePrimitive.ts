import Observable, { Primitive } from "./Observable";

export default class ObservablePrimitive<
  T extends Primitive
> extends Observable<T> {
  constructor(value?: T) {
    super();
    if (value) this.value = value;
  }

  set Value(value: T) {
    this.value = value;
    this.notify(value);
  }
}
