import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import DoorController from "./DoorController";
import DoorPresenter from "./DoorPresenter";
import DoorView from "./DoorView";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";

@injectable()
export default class DoorBuilder extends PresentationBuilder<
  DoorViewModel,
  DoorController,
  DoorView,
  IDoorPresenter
> {
  constructor() {
    super(DoorViewModel, DoorController, DoorView, DoorPresenter);
  }
}
