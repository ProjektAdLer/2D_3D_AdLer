import { injectable, unmanaged as _unmanaged } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";

// TODO: Remove after https://github.com/inversify/InversifyJS/issues/1505 is resolved
export const unmanaged = _unmanaged as () => (
  target: DecoratorTarget,
  targetKey: string | undefined,
  index: number
) => void;

/**
 * @description Generic class for building ViewModel, Controller, View and Presenter.
 *
 * Type Parameters define the type of the ViewModel, Controller, View and Presenter, that are exposed to the client. These should be interfaces where possible.
 *
 * Constructor references passed to the constructor define the types of the ViewModel, Controller, View and Presenter, that are instantiated.
 * The derived class must call the super constructor with the constructor reference or undefined for each of ViewModel, Controller, View and Presenter.
 *
 * Pass undefined in the type parameter and constructor to skip building that component. The view model cannot be skipped.
 *
 *  Override build methods (calling base implementations if needed) to customize the build process.
 *
 * @typeparam VM - ViewModel type.
 * @typeparam C - Controller type.
 * @typeparam V - View type.
 * @typeparam P - Presenter type.
 */
@injectable()
export default abstract class PresentationBuilder<VM, C, V, P>
  implements IPresentationBuilder
{
  // build products
  protected viewModel: VM | undefined = undefined;
  protected controller: C | undefined = undefined;
  protected view: V | undefined = undefined;
  protected presenter: P | undefined = undefined;

  // constructor references
  private viewModelConstructorRef: new () => VM;
  private controllerConstructorRef: (new (viewModel: VM) => C) | undefined;
  private viewConstructorRef:
    | ((new (viewModel: VM, controller: C) => V) & (new (viewModel: VM) => V))
    | undefined;
  private presenterConstructorRef: (new (viewModel: VM) => P) | undefined;

  // constructor for view constructor reference with viewModel and controller
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
    this.viewModelConstructorRef = viewModelConstructorRef;
    this.controllerConstructorRef = controllerConstructorRef;
    this.viewConstructorRef = viewConstructorRef;
    this.presenterConstructorRef = presenterConstructorRef;
  }

  reset(): void {
    this.view = undefined;
    this.viewModel = undefined;
    this.presenter = undefined;
    this.controller = undefined;
  }

  /**
   * @description Builds the ViewModel.
   * Override this method to customize the view model building step.
   * Call the super method to call the base implementation.
   */
  buildViewModel(): void {
    this.viewModel = new this.viewModelConstructorRef();
  }

  /**
   * @description Builds the Controller.
   * This step is skipped if undefined was passed as the controller constructor reference.
   * Override this method to customize the controller building step.
   */
  buildController(): void {
    if (this.controllerConstructorRef === undefined) return;
    if (this.viewModel === undefined) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    this.controller = new this.controllerConstructorRef(this.viewModel);
  }

  /**
   * @description Builds the View.
   * This step is skipped if undefined was passed as the view constructor reference.
   * Override this method to customize the view building step.
   */
  buildView(): void {
    if (this.viewConstructorRef === undefined) return;
    if (this.viewModel === undefined) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    if (this.controllerConstructorRef !== undefined && !this.controller) {
      throw new Error(
        "Controller isn't build yet. Call buildController() first."
      );
    }

    if (this.viewConstructorRef.length === 2) {
      this.view = new this.viewConstructorRef(this.viewModel, this.controller!);
    } else if (this.viewConstructorRef.length === 1) {
      this.view = new this.viewConstructorRef(this.viewModel);
    }
  }

  /**
   * @description Builds the Presenter.
   * This step is skipped if undefined was passed as the presenter constructor reference.
   * Override this method to customize the presenter building step.
   */
  buildPresenter(): void {
    if (this.presenterConstructorRef === undefined) return;
    if (this.viewModel === undefined) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    this.presenter = new this.presenterConstructorRef(this.viewModel);
  }

  /**
   * @returns The build presenter or undefined if the build process was not started yet or isn't complete.
   * @description This method should not be overridden.
   */
  getPresenter(): P | undefined {
    return this.presenter;
  }

  /**
   * @returns The build controller or undefined if the build process was not started yet or isn't complete.
   * @description This method should not be overridden.
   */
  getController(): C | undefined {
    return this.controller;
  }

  /**
   * @returns The build view model or undefined if the build process was not started yet or isn't complete.
   * @description This method should not be overridden.
   */
  getViewModel(): VM | undefined {
    return this.viewModel;
  }

  getView(): V | undefined {
    return this.view;
  }
}
