import { injectable } from "inversify";
import AmbiencePresenter from "./AmbiencePresenter";
import AmbienceView from "./AmbienceView";
import AmbienceViewModel from "./AmbienceViewModel";
import IAmbiencePresenter from "./IAmbiencePresenter";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";

@injectable()
export default class AmbienceBuilder extends AsyncPresentationBuilder<
  AmbienceViewModel,
  undefined,
  AmbienceView,
  IAmbiencePresenter
> {
  constructor() {
    super(AmbienceViewModel, undefined, AmbienceView, AmbiencePresenter);

    this.isCompleted = new Promise((resolve) => {
      this.resolveIsCompleted = resolve;
    });
  }

  buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => {
        this.resolveIsCompleted();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
