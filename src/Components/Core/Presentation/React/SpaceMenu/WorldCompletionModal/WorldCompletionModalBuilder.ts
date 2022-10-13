import { injectable } from "inversify";
import WorldCompletionModalController from "./WorldCompletionModalController";
import WorldCompletionModalPresenter from "./WorldCompletionModalPresenter";
import IWorldCompletionModalController from "./IWorldCompletionModalController";
import IWorldCompletionModalPresenter from "./IWorldCompletionModalPresenter";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

@injectable()
export default class WorldCompletionModalBuilder extends PresentationBuilder<
  WorldCompletionModalViewModel,
  IWorldCompletionModalController,
  undefined,
  IWorldCompletionModalPresenter
> {
  constructor() {
    super(
      WorldCompletionModalViewModel,
      WorldCompletionModalController,
      undefined,
      WorldCompletionModalPresenter
    );
  }
}
