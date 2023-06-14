import { injectable } from "inversify";
import AmbiencePresenter from "./AmbiencePresenter";
import AmbienceView from "./AmbienceView";
import AmbienceViewModel from "./AmbienceViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import IAmbiencePresenter from "./IAmbiencePresenter";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";

export interface IAmbienceBuilder extends IPresentationBuilder {
  isCompleted: Promise<void>;
}

@injectable()
export default class AmbienceBuilder extends PresentationBuilder<
  AmbienceViewModel,
  undefined,
  AmbienceView,
  IAmbiencePresenter
> {
  public readonly isCompleted: Promise<void>;

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

  private resolveIsCompleted: (value: void | PromiseLike<void>) => void;
}
