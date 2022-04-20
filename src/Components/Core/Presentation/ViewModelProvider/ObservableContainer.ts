import IObservableContainer from "./IObservableContainer";

export default class ObservableContainer<T> implements IObservableContainer<T> {
  private values: T[] = [];
  private callbacks: ((values: T[]) => void)[] = [];
  private type: unknown;

  constructor(type: new () => T) {
    this.type = type;
  }

  public matchesType<S>(
    typeToMatch: new () => S
  ): this is ObservableContainer<S> {
    return typeToMatch === this.type;
  }

  public registerRequest(callback: (values: T[]) => void): void {
    if (this.callbacks.indexOf(callback) === -1) {
      // file new callback
      this.callbacks.push(callback);

      // notify immediately with current view models
      if (this.values.length > 0) {
        callback(this.values);
      }
    } else {
      // TODO: log warning for duplicate callback registration
    }
  }

  public cancelRequest(callback: (values: T[]) => void): void {
    var index = this.callbacks.indexOf(callback);
    if (index !== -1) this.callbacks.splice(index, 1);
  }

  public addNewValue(values: T): void {
    if (this.values.indexOf(values) === -1) {
      // file new value
      this.values.push(values);

      // notify all callback
      this.callbacks.forEach((callback) => callback(this.values));
    }
  }

  public removeValue(value: T): void {
    var index = this.values.indexOf(value);
    if (index !== -1) {
      this.values.splice(index, 1);
      this.callbacks.forEach((callback) => callback(this.values));
    }
  }

  public getValues(): T[] {
    return this.values;
  }
}
