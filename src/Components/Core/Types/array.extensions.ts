declare global {
  interface Array<T> {
    last(): T;
    first(): T;
  }
}

/**
 * gets the last element of an array
 */
Array.prototype.last = function <T>(this: T[]): T {
  return this[this.length - 1];
};

export {};
