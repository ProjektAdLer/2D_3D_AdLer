import AbstractObservable from "./AbstractObservable";

export default class ObservableReadonlyID extends AbstractObservable<string> {
  constructor(value?: string) {
    super();
    if (value) this.value = value;
  }

  setValue(value: string) {
    this.value = value;
    this.notify(value);
  }
}
