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
    let container = this.findOrCreateContainer<VM, C>(viewModelClass);
    if (container.matchesType<VM, C>(viewModelClass)) {
      container.registerRequest(callback);
    }
  }

  public cancelRequest<VM, C>(
    callback: VMCProviderCallbackType<VM, C>,
    viewModelClass: { new (): VM }
  ): void {
    let container = this.findContainer<VM, C>(viewModelClass);
    if (!container) return;
    if (container.matchesType<VM, C>(viewModelClass)) {
      container.cancelRequest(callback);
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

  public removeByViewModel<VM>(
    viewModel: VM,
    viewModelClass: { new (): VM }
  ): void {
    let container = this.findContainer<VM, unknown>(viewModelClass);

    if (!container) throw new Error("Container not found");

    container?.removeValueWithTupelIdentitfyer(viewModel);
  }

  private findContainer<VM, C>(viewModelClass: {
    new (): VM;
  }): IObservableContainer<VM, [VM, C]> | undefined {
    let container = this.containers.find((c) => {
      return c.matchesType<VM, [VM, C]>(viewModelClass);
    });
    if (container?.matchesType<VM, [VM, C]>(viewModelClass)) {
      return container;
    }
    return undefined;
  }

  private findOrCreateContainer<VM, C>(viewModelClass: {
    new (): VM;
  }): IObservableContainer<VM, [VM, C]> {
    let container = this.findContainer<VM, C>(viewModelClass);
    if (container === undefined) {
      container = new ObservableContainer<VM, [VM, C]>(viewModelClass);
      this.containers.push(container);
    }
    return container;
  }
}
