import Observable from "./Observable";

export default class ObservableReadonlyID extends Observable<string> {
  constructor(value?: string) {
    super();
    if (value) this.value = value;
  }

  setValue(value: string) {
    this.value = value;
    this.notify(value);
  }
}
