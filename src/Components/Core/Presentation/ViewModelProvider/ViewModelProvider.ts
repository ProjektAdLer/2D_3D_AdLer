import { injectable } from "inversify";
import IViewModelProvider from "./IViewModelProvider";
import ViewModelContainer from "./ViewModelContainer";

@injectable()
export default class ViewModelProvider implements IViewModelProvider {
  private containers: ViewModelContainer<any>[] = [];

  public registerRequest<T>(
    callback: (viewModels: T[]) => void,
    viewModelClass: { new (): T }
  ): void {
    this.findOrCreateContainer<T>(viewModelClass).registerRequest(callback);
  }

  public cancelRequest<T>(
    callback: (viewModels: T[]) => void,
    viewModelClass: { new (): T }
  ): void {
    var container = this.findContainer<T>(viewModelClass);
    container?.cancelRequest(callback);
  }

  public registerViewModel<T>(
    viewModel: T,
    viewModelClass: { new (): T }
  ): void {
    this.findOrCreateContainer<T>(viewModelClass).registerViewModel(viewModel);
  }

  private findContainer<T>(viewModelClass: {
    new (): T;
  }): ViewModelContainer<T> | undefined {
    return this.containers.find((c) => c.matchesType<T>(viewModelClass));
  }

  private findOrCreateContainer<T>(viewModelClass: {
    new (): T;
  }): ViewModelContainer<T> {
    var container = this.findContainer<T>(viewModelClass);
    if (container === undefined) {
      container = new ViewModelContainer<T>(viewModelClass);
      this.containers.push(container);
    }
    return container;
  }
}
