import { injectable } from "inversify";
import DecorationPresenter from "./DecorationPresenter";
import DecorationView from "./DecorationView";
import DecorationViewModel from "./DecorationViewModel";
import IDecorationPresenter from "./IDecorationPresenter";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";

@injectable()
export default class DecorationBuilder extends AsyncPresentationBuilder<
  DecorationViewModel,
  undefined,
  DecorationView,
  IDecorationPresenter
> {
  spaceTemplate: LearningSpaceTemplateType;
  constructor() {
    super(DecorationViewModel, undefined, DecorationView, DecorationPresenter);
  }

  buildViewModel(): void {
    if (!this.spaceTemplate)
      throw new Error(
        "SpaceTemplate is not defined. Set before using the builder."
      );

    super.buildViewModel();

    this.viewModel!.learningSpaceTemplateType.Value = this.spaceTemplate;
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
