import { injectable, unmanaged } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";

/**
 * @class PresentationBuilder
 *
 * @description Generic class for building ViewModel, Controller, View and Presenter.
 *
 * Pass undefined in the type parameter and constructor to ignore building that component.
 * Override build methods (calling base implementations if needed) to customize the build process.
 *
 * The derived class must call the super constructor with the constructor references or undefined for each of ViewModel, Controller, View and Presenter.
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
  protected viewModel: VM | undefined;
  protected controller: C | undefined;
  protected view: V | undefined;
  protected presenter: P | undefined;

  // parameters are decorated with @unmanaged to prevent automatic dependency injection
  constructor(
    @unmanaged()
    private viewModelConstructorRef: new () => VM | undefined,
    @unmanaged()
    private controllerConstructorRef: (new (viewModel: VM) => C) | undefined,
    @unmanaged()
    private viewConstructorRef:
      | (new (viewmodel: VM, controller?: C) => V)
      | undefined,
    @unmanaged()
    private presenterConstructorRef: (new (viewModel: VM) => P) | undefined
  ) {
    this.reset();
  }

  reset(): void {
    this.view = undefined;
    this.viewModel = undefined;
    this.presenter = undefined;
    this.controller = undefined;
  }

  buildViewModel(): void {
    if (this.viewModelConstructorRef === undefined) return;
    this.viewModel = new this.viewModelConstructorRef();
  }

  buildController(): void {
    if (!this.controllerConstructorRef) return;
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    this.controller = new this.controllerConstructorRef(this.viewModel);
  }

  buildView(): void {
    if (this.viewConstructorRef === undefined) return;
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    if (this.controllerConstructorRef !== undefined && !this.controller) {
      throw new Error(
        "Controller isn't build yet. Call buildController() first."
      );
    }
    this.view = new this.viewConstructorRef(this.viewModel, this.controller);
  }

  buildPresenter(): void {
    if (this.presenterConstructorRef === undefined) return;
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    this.presenter = new this.presenterConstructorRef(this.viewModel);
  }

  getPresenter() {
    return this.presenter;
  }
  getController() {
    return this.controller;
  }
  getViewModel() {
    return this.viewModel;
  }
}
