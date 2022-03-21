import Observable from "./Observable";

export default class ObservableClass<T> {
  private data: T;
  constructor(type: { new (): T }) {
    this.data = new type();
    for (const [key, value] of Object.entries(this.data)) {
      if (value instanceof Observable) console.log(key);
    }
  }

  get Data(): T {
    return this.data;
  }
}
