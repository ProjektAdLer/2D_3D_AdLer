/**
 * T = The identifier
 * U = The value
 */
export default interface IObservableContainer<T, U> {
  /**
   * User-defined type guard that determines whether this container's elements match the given type.
   * @param typeToMatch The type to match with this containers elemtn type.
   * @returns True if this container's elements match the given type, false otherwise.
   */
  matchesType<X, Y>(
    typeToMatch: new () => X
  ): this is IObservableContainer<X, Y>;

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
   * Removes a Tupel by its first element. (By 21.05.22 it is always a View Model)
   * @param tupelIdentifier  the identifyer of the tupel to remove
   */
  removeValueWithTupelIdentitfyer(tupelIdentifier: T): void;

  removeValue(value: U): void;

  /**
   * Returns the values contained in this container.
   */
  getValues(): U[];
}
