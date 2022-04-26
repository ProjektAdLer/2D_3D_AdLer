import AbstractObservable from "./AbstractObservable";

export type Primitive = string | boolean | number | Symbol;

export default class ObservablePrimitive<
  T extends Primitive
> extends AbstractObservable<T> {
  constructor(value?: T) {
    super();
    if (value) this.value = value;
  }

  setValue(value: T) {
    this.value = value;
    this.notify(value);
  }
}
