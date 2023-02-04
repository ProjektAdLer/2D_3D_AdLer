import { injectable } from "inversify";
import WorldDetailPresenter from "./WorldDetailPresenter";
import IWorldDetailPresenter from "./IWorldDetailPresenter";
import WorldDetailViewModel from "./WorldDetailViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldDetailController from "./WorldDetailController";

@injectable()
export default class WorldDetailBuilder extends PresentationBuilder<
  WorldDetailViewModel,
  WorldDetailController,
  undefined,
  IWorldDetailPresenter
> {
  constructor() {
    super(
      WorldDetailViewModel,
      WorldDetailController,
      undefined,
      WorldDetailPresenter
    );
  }
}
