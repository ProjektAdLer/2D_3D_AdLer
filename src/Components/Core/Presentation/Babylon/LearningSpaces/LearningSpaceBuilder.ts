import { injectable } from "inversify";
import ILearningSpaceController from "./ILearningSpaceController";
import LearningSpaceController from "./LearningSpaceController";
import LearningSpacePresenter from "./LearningSpacePresenter";
import LearningSpaceView from "./LearningSpaceView";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpaceView from "./ILearningSpaceView";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";

@injectable()
export default class LearningSpaceBuilder extends AsyncPresentationBuilder<
  LearningSpaceViewModel,
  ILearningSpaceController,
  ILearningSpaceView,
  ILearningSpacePresenter
> {
  spaceData: LearningSpaceTO;

  constructor() {
    super(
      LearningSpaceViewModel,
      LearningSpaceController,
      LearningSpaceView,
      LearningSpacePresenter
    );
  }

  override buildViewModel(): void {
    if (!this.spaceData)
      throw new Error(
        "Space data is not defined. Set before using the builder."
      );

    super.buildViewModel();
    this.viewModel!.id = this.spaceData.id;
    this.viewModel!.learningSpaceTemplateType.Value = this.spaceData.template;
  }

  override buildPresenter(): void {
    super.buildPresenter();

    this.presenter!.asyncSetupSpace(this.spaceData)
      .then(() => {
        this.resolveIsCompleted();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
