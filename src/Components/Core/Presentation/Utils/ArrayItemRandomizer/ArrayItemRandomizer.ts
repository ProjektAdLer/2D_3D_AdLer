import { injectable } from "inversify";
import IArrayItemRandomizer from "./IArrayItemRandomizer";
import SeededRNG from "../SeededRNG";

@injectable()
export default class ArrayItemRandomizer<T> implements IArrayItemRandomizer<T> {
  constructor(private array: T[]) {}

  getItem(seed?: string): T {
    return this.array[this.getRandomIndex(seed)];
  }

  private getRandomIndex(seed?: string): number {
    if (seed !== undefined) {
      const seededRNG = new SeededRNG(seed);

      // TODO: comment in if needed
      // skip the first 15 numbers to create create more mixed initial state
      // for (let i = 0; i < 15; i++) seededRandom();

      return Math.floor(seededRNG.seededRandom() * this.array.length);
    }

    return Math.floor(Math.random() * this.array.length);
  }
}
