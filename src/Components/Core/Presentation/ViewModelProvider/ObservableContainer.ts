import IObservableContainer from "./IObservableContainer";

export default class ObservableContainer<T, U>
  implements IObservableContainer<T, U>
{
  private values: U[] = [];
  private callbacks: ((values: U[]) => void)[] = [];
  private type: unknown;

  constructor(type: new () => T) {
    this.type = type;
  }

  public matchesType<X, Y>(
    typeToMatch: new () => X
  ): this is IObservableContainer<X, Y> {
    return typeToMatch === this.type;
  }

  public registerRequest(callback: (values: U[]) => void): void {
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

  public cancelRequest(callback: (values: U[]) => void): void {
    let index = this.callbacks.indexOf(callback);
    if (index !== -1) this.callbacks.splice(index, 1);
  }

  public addNewValue(values: U): void {
    if (this.values.indexOf(values) === -1) {
      // file new value
      this.values.push(values);

      // notify all callback
      this.callbacks.forEach((callback) => callback(this.values));
    }
  }

  public removeValue(value: U): void {
    let index = this.values.indexOf(value);
    if (index !== -1) {
      this.values.splice(index, 1);
      this.callbacks.forEach((callback) => callback(this.values));
    }
  }

  removeValueWithTupelIdentitfyer(identifier: T): void {
    let index = this.values.findIndex((value: any) => value[0] === identifier);

    if (index === -1)
      throw new Error("Entry for idenitfier" + identifier + " not found");

    this.values.splice(index, 1);
    this.callbacks.forEach((callback) => callback(this.values));
  }

  public getValues(): U[] {
    return this.values;
  }
}
