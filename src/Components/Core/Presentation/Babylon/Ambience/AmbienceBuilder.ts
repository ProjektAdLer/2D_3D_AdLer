import { injectable } from "inversify";
import AmbiencePresenter from "./AmbiencePresenter";
import AmbienceView from "./AmbienceView";
import AmbienceViewModel from "./AmbienceViewModel";
import IAmbiencePresenter from "./IAmbiencePresenter";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import { IAmbienceBuilder } from "./IAmbienceBuilder";

@injectable()
export default class AmbienceBuilder
  extends AsyncPresentationBuilder<
    AmbienceViewModel,
    undefined,
    AmbienceView,
    IAmbiencePresenter
  >
  implements IAmbienceBuilder
{
  theme: LearningSpaceThemeType;

  constructor() {
    super(AmbienceViewModel, undefined, AmbienceView, AmbiencePresenter);
  }

  buildViewModel(): void {
    super.buildViewModel();

    this.viewModel!.theme = this.theme;
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
