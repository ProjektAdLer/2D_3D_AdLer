export default interface IArrayItemRandomizer<T> {
  getItem(seed?: string): T;
}
