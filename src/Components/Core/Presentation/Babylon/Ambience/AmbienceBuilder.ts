import { injectable } from "inversify";
import AmbiencePresenter from "./AmbiencePresenter";
import AmbienceView from "./AmbienceView";
import AmbienceViewModel from "./AmbienceViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import IAmbiencePresenter from "./IAmbiencePresenter";

@injectable()
export default class AmbienceBuilder extends PresentationBuilder<
  AmbienceViewModel,
  undefined,
  AmbienceView,
  IAmbiencePresenter
> {
  constructor() {
    super(AmbienceViewModel, undefined, AmbienceView, AmbiencePresenter);
  }
}
