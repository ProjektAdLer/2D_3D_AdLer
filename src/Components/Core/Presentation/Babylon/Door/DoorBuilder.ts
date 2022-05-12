import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import DoorPresenter from "./DoorPresenter";
import DoorView from "./DoorView";
import DoorViewModel from "./DoorViewModel";

@injectable()
export default class DoorBuilder extends PresentationBuilder<
  DoorViewModel,
  undefined,
  DoorView,
  DoorPresenter
> {
  constructor() {
    super(DoorViewModel, undefined, DoorView, DoorPresenter);
  }
}
