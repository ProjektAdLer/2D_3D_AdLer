import { injectable } from "inversify";
import UseGuideController from "./UseGuideController";
import UseGuidePresenter from "./UseGuidePresenter";
import IUseGuideController from "./IUseGuideController";
import IUseGuidePresenter from "./IUseGuidePresenter";
import UseGuideViewModel from "./UseGuideViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
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
