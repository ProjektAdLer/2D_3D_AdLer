import { injectable } from "inversify";
import IObservableContainer from "./IObservableContainer";
import IViewModelProvider from "./IViewModelProvider";
import ObservableContainer from "./ObservableContainer";

@injectable()
export default class ViewModelProvider implements IViewModelProvider {
  private containers: IObservableContainer<unknown>[] = [];

  public registerRequest<T>(
    callback: (viewModels: T[]) => void,
    viewModelClass: { new (): T }
  ): void {
    var container = this.findOrCreateContainer<T>(viewModelClass);
    if (container.matchesType<T>(viewModelClass)) {
      container.registerRequest(callback);
    }
  }

  public cancelRequest<T>(
    callback: (viewModels: T[]) => void,
    viewModelClass: { new (): T }
  ): void {
    var container = this.findContainer<T>(viewModelClass);
    if (container?.matchesType<T>(viewModelClass)) {
      container?.cancelRequest(callback);
    }
  }

  public registerViewModel<T>(
    viewModel: T,
    viewModelClass: { new (): T }
  ): void {
    this.findOrCreateContainer<T>(viewModelClass).addNewValue(viewModel);
  }

  public removeViewModel<T>(viewModel: T, viewModelClass: { new (): T }): void {
    var container = this.findContainer<T>(viewModelClass);
    container?.removeValue(viewModel);
  }

  private findContainer<T>(viewModelClass: {
    new (): T;
  }): IObservableContainer<T> | undefined {
    var container = this.containers.find((c) =>
      c.matchesType<T>(viewModelClass)
    );
    if (container?.matchesType<T>(viewModelClass)) {
      return container;
    }
    return undefined;
  }

  private findOrCreateContainer<T>(viewModelClass: {
    new (): T;
  }): IObservableContainer<T> {
    var container = this.findContainer<T>(viewModelClass);
    if (container === undefined) {
      container = new ObservableContainer<T>(viewModelClass);
      this.containers.push(container);
    }
    return container;
  }
}
