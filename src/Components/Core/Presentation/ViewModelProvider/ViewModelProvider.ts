import { injectable } from "inversify";
import { ConstructorReference } from "../../Types/EntityManagerTypes";
import IObservableContainer from "./IObservableContainer";
import IViewModelControllerProvider, {
  VMCProviderCallbackType,
} from "./IViewModelControllerProvider";
import ObservableContainer from "./ObservableContainer";

@injectable()
export default class ViewModelProvider implements IViewModelControllerProvider {
  private containers: IObservableContainer<unknown>[] = [];

  public registerTupelRequest<T, C = unknown>(
    callback: VMCProviderCallbackType<T, C>,
    viewModelClass: ConstructorReference<T>
  ): void {
    var container = this.findOrCreateContainer<T>(viewModelClass);
    if (container.matchesType<T>(viewModelClass)) {
      // @ts-ignore
      container.registerRequest(callback);
    }
  }

  public cancelRequest<VM, C>(
    callback: VMCProviderCallbackType<VM, C>,
    viewModelClass: { new (): VM }
  ): void {
    var container = this.findContainer<VM>(viewModelClass);
    if (container?.matchesType<VM>(viewModelClass)) {
      // @ts-ignore
      container?.cancelRequest(callback);
    }
  }

  registerTupel<VM, C>(
    viewModel: VM,
    controller: C,
    viewModelClass: ConstructorReference<VM>,
    controllerClass: ConstructorReference<C>
  ): void {
    throw new Error("Method not implemented.");
  }

  public registerViewModelOnly<T>(
    viewModel: T,
    viewModelClass: { new (): T }
  ): void {
    this.findOrCreateContainer<T>(viewModelClass).addNewValue(viewModel);
  }

  public removeTupel<T>(viewModel: T, viewModelClass: { new (): T }): void {
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
