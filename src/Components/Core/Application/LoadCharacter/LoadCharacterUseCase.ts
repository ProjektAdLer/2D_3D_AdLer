import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILoadCharacterUseCase from "./ILoadCharacterUseCase";

export default class LoadCharacterUseCase implements ILoadCharacterUseCase {
  async executeAsync(): Promise<void> {
    return Promise.resolve();
  }
}
