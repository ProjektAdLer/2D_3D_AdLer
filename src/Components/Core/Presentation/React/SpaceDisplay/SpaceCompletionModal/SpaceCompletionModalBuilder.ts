import { injectable } from "inversify";
import SpaceCompletionModalController from "./SpaceCompletionModalController";
import SpaceCompletionModalPresenter from "./SpaceCompletionModalPresenter";
import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceCompletionModalBuilder).to(SpaceCompletionModalBuilder);
ISpaceCompletionModalBuilder: Symbol("ISpaceCompletionModalBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.ISpaceCompletionModalBuilder
);
director.build();
*/

@injectable()
export default class SpaceCompletionModalBuilder extends PresentationBuilder<
  SpaceCompletionModalViewModel,
  ISpaceCompletionModalController,
  undefined,
  ISpaceCompletionModalPresenter
> {
  constructor() {
    super(
      SpaceCompletionModalViewModel,
      SpaceCompletionModalController,
      undefined,
      SpaceCompletionModalPresenter
    );
  }
}
