import { injectable } from "inversify";
import SpaceSelectionGraphController from "./SpaceSelectionGraphController";
import SpaceSelectionGraphPresenter from "./SpaceSelectionGraphPresenter";
import ISpaceSelectionGraphController from "./ISpaceSelectionGraphController";
import ISpaceSelectionGraphPresenter from "./ISpaceSelectionGraphPresenter";
import SpaceSelectionGraphViewModel from "./SpaceSelectionGraphViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

@injectable()
export default class SpaceSelectionGraphBuilder extends PresentationBuilder<
  SpaceSelectionGraphViewModel,
  ISpaceSelectionGraphController,
  undefined,
  ISpaceSelectionGraphPresenter
> {
  constructor() {
    super(
      SpaceSelectionGraphViewModel,
      SpaceSelectionGraphController,
      undefined,
      SpaceSelectionGraphPresenter
    );
  }
}
