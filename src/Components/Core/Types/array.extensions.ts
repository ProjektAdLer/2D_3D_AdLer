//@ts-ignore
interface Array {
  last(): any;
  first(): any;
}

/**
 * gets the last element of an array
 */
Array.prototype.last = function () {
  return this[this.length - 1];
};
