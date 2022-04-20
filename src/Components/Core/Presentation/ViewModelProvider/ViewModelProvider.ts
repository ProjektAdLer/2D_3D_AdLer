import { injectable } from "inversify";
import IObservableContainer from "./IObservableContainer";
import IViewModel from "./IViewModel";
import IViewModelProvider from "./IViewModelProvider";
import ObservableContainer from "./ObservableContainer";

@injectable()
export default class ViewModelProvider implements IViewModelProvider {
  private containers: IObservableContainer<IViewModel>[] = [];

  public registerRequest<T extends IViewModel>(
    callback: (viewModels: T[]) => void,
    viewModelClass: { new (): T }
  ): void {
    var container = this.findOrCreateContainer<T>(viewModelClass);
    if (container.matchesType<T>(viewModelClass)) {
      container.registerRequest(callback);
    }
  }

  public cancelRequest<T extends IViewModel>(
    callback: (viewModels: T[]) => void,
    viewModelClass: { new (): T }
  ): void {
    var container = this.findContainer<T>(viewModelClass);
    if (container?.matchesType<T>(viewModelClass)) {
      container?.cancelRequest(callback);
    }
  }

  public registerViewModel<T extends IViewModel>(
    viewModel: T,
    viewModelClass: { new (): T }
  ): void {
    this.findOrCreateContainer<T>(viewModelClass).addNewValue(viewModel);
  }

  public removeViewModel<T extends IViewModel>(
    viewModel: T,
    viewModelClass: { new (): T }
  ): void {
    var container = this.findContainer<T>(viewModelClass);
    container?.removeValue(viewModel);
  }

  private findContainer<T extends IViewModel>(viewModelClass: {
    new (): T;
  }): IObservableContainer<IViewModel> | undefined {
    return this.containers.find((c) => c.matchesType<T>(viewModelClass));
  }

  private findOrCreateContainer<T extends IViewModel>(viewModelClass: {
    new (): T;
  }): IObservableContainer<IViewModel> {
    var container = this.findContainer<T>(viewModelClass);
    if (container === undefined) {
      container = new ObservableContainer<T>(viewModelClass);
      this.containers.push(container);
    }
    return container;
  }
}
