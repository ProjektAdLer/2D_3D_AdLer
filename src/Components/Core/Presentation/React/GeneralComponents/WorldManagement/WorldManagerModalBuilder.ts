import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldManagerModalController from "./WorldManagerModalController";
import WorldManagerModalPresenter from "./WorldManagerModalPresenter";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import IWorldManagerModalController from "./IWorldManagerModalController";
import IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";

@injectable()
export default class WorldManagerModalBuilder extends PresentationBuilder<
  WorldManagerModalViewModel,
  IWorldManagerModalController,
  undefined,
  IWorldManagerModalPresenter
> {
  constructor() {
    super(
      WorldManagerModalViewModel,
      WorldManagerModalController,
      undefined,
      WorldManagerModalPresenter,
    );
  }

  override buildController(): void {
    super.buildController();
    // Inject presenter reference into controller
    if (this.controller && this.presenter) {
      (this.controller as any).presenter = this.presenter;
    }
  }

  override buildPresenter(): void {
    super.buildPresenter();
    // Note: Electron listeners should be set up in the component's useEffect
    // to avoid multiple registrations on remount
  }
}
