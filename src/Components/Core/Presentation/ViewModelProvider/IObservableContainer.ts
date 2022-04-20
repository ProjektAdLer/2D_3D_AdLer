export default interface IObservableContainer<T> {
  /**
   * User-defined type guard that determines whether this container's elements match the given type.
   * @param typeToMatch The type to match with this containers elemtn type.
   * @returns True if this container's elements match the given type, false otherwise.
   */
  matchesType<S>(typeToMatch: new () => S): this is IObservableContainer<S>;

  /**
   * Registers a callback. The callback is called every time a value is added or removed.
   * @param callback The callback to be called.
   */
  registerRequest(callback: (values: T[]) => void): void;

  /**
   * Cancels a registered callback.
   * @param callback The callback to be cancelled.
   */
  cancelRequest(callback: (values: T[]) => void): void;

  /**
   * Adds a new value to the container.
   * @param value The value to add.
   */
  addNewValue(value: T): void;

  /**
   * Removes a value from the container.
   * @param value The value to remove.
   */
  removeValue(value: T): void;

  /**
   * Returns the values contained in this container.
   */
  getValues(): T[];
}
