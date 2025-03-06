import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import INarrativeFrameworkPresenter from "./INarrativeFrameworkPresenter";
import NarrativeFrameworkController from "./NarrativeFrameworkController";
import NarrativeFrameworkPresenter from "./NarrativeFrameworkPresenter";

@injectable()
export default class NarrativeFrameworkBuilder extends PresentationBuilder<
  NarrativeFrameworkViewModel,
  INarrativeFrameworkController,
  undefined,
  INarrativeFrameworkPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkViewModel,
      NarrativeFrameworkController,
      undefined,
      NarrativeFrameworkPresenter,
    );
  }
}
