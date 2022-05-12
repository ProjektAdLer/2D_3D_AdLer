import { injectable } from "inversify";
import { ConstructorReference } from "../../Types/EntityManagerTypes";
import IObservableContainer from "./IObservableContainer";
import IViewModelControllerProvider, {
  VMCProviderCallbackType,
} from "./IViewModelControllerProvider";
import ObservableContainer from "./ObservableContainer";

@injectable()
export default class ViewModelControllerProvider
  implements IViewModelControllerProvider
{
  private containers: IObservableContainer<unknown, [unknown, unknown]>[] = [];

  public registerTupelRequest<VM, C>(
    callback: VMCProviderCallbackType<VM, C>,
    viewModelClass: ConstructorReference<VM>
  ): void {
    var container = this.findOrCreateContainer<VM, C>(viewModelClass);
    if (container.matchesType<VM, C>(viewModelClass)) {
      container.registerRequest(callback);
    }
  }

  public cancelRequest<VM, C>(
    callback: VMCProviderCallbackType<VM, C>,
    viewModelClass: { new (): VM }
  ): void {
    var container = this.findContainer<VM, C>(viewModelClass);
    if (container?.matchesType<VM, C>(viewModelClass)) {
      // @ts-ignore
      container?.cancelRequest(callback);
    }
  }

  registerTupel<VM, C>(
    viewModel: VM,
    controller: C,
    viewModelClass: ConstructorReference<VM>
  ): void {
    this.findOrCreateContainer<VM, C>(viewModelClass).addNewValue([
      viewModel,
      controller,
    ]);
  }

  public registerViewModelOnly<VM>(
    viewModel: VM,
    viewModelClass: { new (): VM }
  ): void {
    this.findOrCreateContainer<VM, undefined>(viewModelClass).addNewValue([
      viewModel,
      undefined,
    ]);
  }

  public removeTupel<VM, C>(
    tupel: [VM, C],
    viewModelClass: { new (): VM }
  ): void {
    var container = this.findContainer<VM, any>(viewModelClass);
    container?.removeValue(tupel);
  }

  private findContainer<VM, C>(viewModelClass: {
    new (): VM;
  }): IObservableContainer<VM, [VM, C]> | undefined {
    var container = this.containers.find((c) => {
      const match = c.matchesType<VM, [VM, C]>(viewModelClass);
      return match;
    });
    if (container?.matchesType<VM, [VM, C]>(viewModelClass)) {
      return container;
    }
    return undefined;
  }

  private findOrCreateContainer<VM, C>(viewModelClass: {
    new (): VM;
  }): IObservableContainer<VM, [VM, C]> {
    var container = this.findContainer<VM, C>(viewModelClass);
    if (container === undefined) {
      container = new ObservableContainer<VM, [VM, C]>(viewModelClass);
      this.containers.push(container);
    }
    return container;
  }
}
