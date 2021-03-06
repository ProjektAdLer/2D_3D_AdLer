import { ConstructorReference } from "../../Types/EntityManagerTypes";
export type VMCProviderCallbackType<VM, C> = ([viewModels, controllers]: [
  VM,
  C
][]) => void;

export default interface IViewModelControllerProvider {
  /**
   * Registers a callback for all view models of the given type. The callback is called every time a new view model of the given type is registered.
   * @param callback The callback to be called when a new view model is registered.
   * @param viewModelClass The constructor reference of view model to register for.
   */
  registerTupelRequest<VM, C = unknown>(
    callback: VMCProviderCallbackType<VM, C>,
    viewModelClass: ConstructorReference<VM>
  ): void;

  /**
   * Cancels a registered callback for view models of the given type.
   * @param callback The callback to be cancelled.
   * @param viewModelClass The constructor reference of view model to cancel the registration for.
   */
  cancelRequest<VM, C>(
    callback: VMCProviderCallbackType<VM, C>,
    viewModelClass: ConstructorReference<VM>
  ): void;

  /**
   * Registers a view model to be provided to all callbacks of the given type.
   * @param viewModel The view model to register.
   * @param viewModelClass The constructor reference of the registered view model.
   */

  registerViewModelOnly<VM>(
    viewModel: VM,
    viewModelClass: ConstructorReference<VM>
  ): void;

  /**
   * Registers a view model and controller Tupel to be provided to all callbacks of the given type.
   * @param viewModel The view model to register.
   * @param controller The controller to register.
   * @param viewModelClass The constructor reference of the registered view model.
   */
  registerTupel<VM, C>(
    viewModel: VM,
    controller: C,
    viewModelClass: ConstructorReference<VM>
  ): void;

  /**
   * Removes a view model from the provider.
   * @param viewModel The tupel of view model and controller to remove.
   * @param viewModelClass The constructor reference of the removed view model.
   */
  removeByViewModel<VM>(
    viewModel: VM,
    viewModelClass: ConstructorReference<VM>
  ): void;
}
