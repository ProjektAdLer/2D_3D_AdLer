import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import WorldManagerModalController from "./WorldManagerModalController";
import WorldManagerModalPresenter from "./WorldManagerModalPresenter";
import type IWorldManagerModalController from "./IWorldManagerModalController";
import type IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";

/**
 * Builder for WorldManagerModal
 * Creates and wires up the MVC components following the Builder pattern
 */
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

  /**
   * Override buildPresenter to wire up the controller with the presenter
   */
  override buildPresenter(): void {
    super.buildPresenter();

    // Wire presenter to controller
    if (this.presenter && this.controller) {
      (this.controller as WorldManagerModalController).setPresenter(
        this.presenter,
      );
    }
  }
}
