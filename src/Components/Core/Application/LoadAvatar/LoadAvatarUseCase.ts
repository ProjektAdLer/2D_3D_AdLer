import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILoadAvatarUseCase from "./ILoadAvatarUseCase";

export default class LoadAvatarUseCase implements ILoadAvatarUseCase {
  async executeAsync(): Promise<void> {
    return Promise.resolve();
  }
}
