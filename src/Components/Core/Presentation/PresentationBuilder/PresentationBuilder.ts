import { injectable, unmanaged } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";

/**
 * @class PresentationBuilder
 * @implements IPresentationBuilder
 * @description Generic class for building ViewModel, Controller, View and Presenter.
 * Pass null in the type parameter and constructor to ignore building that component.
 * Override build methods (calling base implementations if needed) to customize the build process.
 * @typeparam VM - ViewModel type.
 * @typeparam C - Controller type.
 * @typeparam V - View type.
 * @typeparam P - Presenter type.
 */
@injectable()
export default abstract class PresentationBuilder<VM, C, V, P>
  implements IPresentationBuilder
{
  protected viewModel: VM | null;
  protected controller: C | null;
  protected view: V | null;
  protected presenter: P | null;

  constructor(
    @unmanaged()
    private viewModelConstructorRef: (new () => VM) | null,
    @unmanaged()
    private controllerConstructorRef: (new (viewModel: VM) => C) | null,
    @unmanaged()
    private viewConstructorRef:
      | (new (viewmodel: VM, controller: C) => V)
      | null,
    @unmanaged()
    private presenterConstructorRef: (new (viewModel: VM) => P) | null
  ) {}

  reset(): void {
    this.view = null;
    this.viewModel = null;
    this.presenter = null;
    this.controller = null;
  }

  buildViewModel(): void {
    if (this.viewModelConstructorRef === null) return;
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
    if (this.viewConstructorRef === null) return;
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    if (!this.controller) {
      throw new Error(
        "Controller isn't build yet. Call buildController() first."
      );
    }
    this.view = new this.viewConstructorRef(this.viewModel, this.controller);
  }

  buildPresenter(): void {
    if (this.presenterConstructorRef === null) return;
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
