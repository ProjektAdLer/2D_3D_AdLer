import { injectable } from "inversify";
import UseGuideController from "./UseGuideController";
import UseGuidePresenter from "./UseGuidePresenter";
import IUseGuideController from "./IUseGuideController";
import IUseGuidePresenter from "./IUseGuidePresenter";
import UseGuideViewModel from "./UseGuideViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.IUseGuideBuilder).to(UseGuideBuilder);
IUseGuideBuilder: Symbol("IUseGuideBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.IUseGuideBuilder
);
director.build();
*/

@injectable()
export default class UseGuideBuilder extends PresentationBuilder<
  UseGuideViewModel,
  IUseGuideController,
  undefined,
  IUseGuidePresenter
> {
  constructor() {
    super(UseGuideViewModel, UseGuideController, undefined, UseGuidePresenter);
  }
}
