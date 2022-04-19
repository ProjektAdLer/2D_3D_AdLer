import Observable from "./Observable";

export type Primitive = string | boolean | number | Symbol;

export default class ObservablePrimitive<
  T extends Primitive
> extends Observable<T> {
  constructor(value?: T) {
    super();
    if (value) this.value = value;
  }

  setValue(value: T) {
    this.value = value;
    this.notify(value);
  }
}
