import { unmanaged as _unmanaged } from "inversify";
import IAsyncPresentationBuilder from "./IAsyncPresentationBuilder";
import PresentationBuilder from "./PresentationBuilder";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";

// TODO: Remove after https://github.com/inversify/InversifyJS/issues/1505 is resolved
export const unmanaged = _unmanaged as () => (
  target: DecoratorTarget,
  targetKey: string | undefined,
  index: number
) => void;

export default abstract class AsyncPresentationBuilder<VM, C, V, P>
  extends PresentationBuilder<VM, C, V, P>
  implements IAsyncPresentationBuilder
{
  constructor(
    viewModelConstructorRef: new () => VM,
    controllerConstructorRef: (new (viewModel: VM) => C) | undefined,
    viewConstructorRef: (new (viewModel: VM, controller: C) => V) | undefined,
    presenterConstructorRef: (new (viewModel: VM) => P) | undefined
  );

  // constructor for view constructor reference with only viewModel
  constructor(
    viewModelConstructorRef: new () => VM,
    controllerConstructorRef: (new (viewModel: VM) => C) | undefined,
    viewConstructorRef: (new (viewModel: VM) => V) | undefined,
    presenterConstructorRef: (new (viewModel: VM) => P) | undefined
  );

  // parameters are decorated with @unmanaged to prevent automatic dependency injection
  constructor(
    @unmanaged()
    viewModelConstructorRef: new () => VM,
    @unmanaged()
    controllerConstructorRef: (new (viewModel: VM) => C) | undefined,
    @unmanaged()
    viewConstructorRef:
      | ((new (viewModel: VM, controller: C) => V) & (new (viewModel: VM) => V))
      | undefined,
    @unmanaged()
    presenterConstructorRef: (new (viewModel: VM) => P) | undefined
  ) {
    super(
      viewModelConstructorRef,
      controllerConstructorRef,
      viewConstructorRef,
      presenterConstructorRef
    );

    this.isCompleted = new Promise<void>((resolve) => {
      this.resolveIsCompleted = resolve;
    });
  }

  override reset(): void {
    super.reset();
    this.isCompleted = new Promise<void>((resolve) => {
      this.resolveIsCompleted = resolve;
    });
  }

  isCompleted: Promise<void>;

  protected resolveIsCompleted: (value: void | PromiseLike<void>) => void;
}
