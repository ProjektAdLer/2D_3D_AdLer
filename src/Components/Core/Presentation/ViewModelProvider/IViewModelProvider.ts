export type callbackType<VM, C> = (viewModels: VM[], controllers: C[]) => void;

export default interface IViewModelControllerProvider {
  /**
   * Registers a callback for all view models of the given type. The callback is called every time a new view model of the given type is registered.
   * @param callback The callback to be called when a new view model is registered.
   * @param viewModelClass The type of view model to register for.
   */
  registerTupelRequest<VM, C>(
    callback: callbackType<VM, C>,
    viewModelClass: { new (): VM }
  ): void;

  /**
   * Cancels a registered callback for view models of the given type.
   * @param callback The callback to be cancelled.
   * @param viewModelClass The type of view model to cancel the registration for.
   */
  cancelRequest<VM>(
    callback: (viewModels: VM[]) => void,
    viewModelClass: { new (): VM }
  ): void;

  /**
   * Registers a view model to be provided to all callbacks of the given type.
   * @param viewModel The view model to register.
   * @param viewModelClass The type of the registered view model.
   */
  registerViewModelOnly<T>(viewModel: T, viewModelClass: { new (): T }): void;

  registerTupel<T>(viewModel: T, viewModelClass: { new (): T }): void;

  /**
   * Removes a view model from the provider.
   * @param viewModel The view model to remove.
   * @param viewModelClass The type of the removed view model.
   */
  removeViewModel<T>(viewModel: T, viewModelClass: { new (): T }): void;
}
