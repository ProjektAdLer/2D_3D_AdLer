export default interface IObservableContainer<T, U> {
  /**
   * User-defined type guard that determines whether this container's elements match the given type.
   * @param typeToMatch The type to match with this containers elemtn type.
   * @returns True if this container's elements match the given type, false otherwise.
   */
  matchesType<T, U>(
    typeToMatch: new () => T
  ): this is IObservableContainer<T, U>;

  /**
   * Registers a callback. The callback is called every time a value is added or removed.
   * @param callback The callback to be called.
   */
  registerRequest(callback: (values: U[]) => void): void;

  /**
   * Cancels a registered callback.
   * @param callback The callback to be cancelled.
   */
  cancelRequest(callback: (values: U[]) => void): void;

  /**
   * Adds a new value to the container.
   * @param value The value to add.
   */
  addNewValue(value: U): void;

  /**
   * Removes a value from the container.
   * @param value The value to remove.
   */
  removeValue(value: U): void;

  /**
   * Returns the values contained in this container.
   */
  getValues(): U[];
}
