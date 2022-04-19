export default class ViewModelContainer<T> {
  private viewModels: T[] = [];
  private requestCallbacks: ((viewModels: T[]) => void)[] = [];
  private type: any;

  constructor(type: new () => T) {
    this.type = type;
  }

  public matchesType<S>(
    typeToMatch: new () => S
  ): this is ViewModelContainer<S> {
    return typeToMatch === this.type;
  }

  public registerRequest(callback: (viewModels: T[]) => void): void {
    this.requestCallbacks.push(callback);
    if (this.viewModels.length > 0) {
      callback(this.viewModels);
    }
  }

  public cancelRequest(callback: (viewModels: T[]) => void): void {
    this.requestCallbacks.splice(this.requestCallbacks.indexOf(callback), 1);
  }

  public registerViewModel(viewModel: T): void {
    this.viewModels.push(viewModel);
    this.requestCallbacks.forEach((callback) => callback(this.viewModels));
  }
}
