import { inject, injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import IPresentationBuilder from "../../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../Presentation/PresentationBuilder/IPresentationDirector";
import type IAvatarPort from "./IAvatarPort";
import ILoadAvatarUseCase from "./ILoadAvatarUseCase";

@injectable()
export default class LoadAvatarUseCase implements ILoadAvatarUseCase {
  constructor(
    @inject(PORT_TYPES.IAvatarPort) private avatarPort: IAvatarPort
  ) {}

  async executeAsync(): Promise<void> {
    let director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const builder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IAvatarBuilder
    );
    director.build(builder);

    // TODO: Call port to present loaded avatar data

    return Promise.resolve();
  }
}
