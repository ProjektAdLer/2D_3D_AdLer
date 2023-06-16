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
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import AbstractLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/AbstractLearningSpaceDimensionStrategy";
import GenericLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";
import TemplateLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/TemplateLearningSpaceDimensionStrategy";

@injectable()
export default class LearningSpaceBuilder extends AsyncPresentationBuilder<
  LearningSpaceViewModel,
  ILearningSpaceController,
  ILearningSpaceView,
  ILearningSpacePresenter
> {
  spaceData: LearningSpaceTO;
  private dimensionStrategy: AbstractLearningSpaceDimensionStrategy;

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

    this.setDimensionsStrategy(this.spaceData.template);
    this.viewModel!.spaceCornerPoints.Value =
      this.dimensionStrategy.getCornerPoints(this.spaceData);
    this.viewModel!.exitDoorPosition.Value =
      this.dimensionStrategy.getExitDoorPosition(this.spaceData);
    this.viewModel!.entryDoorPosition.Value =
      this.dimensionStrategy.getEntryDoorPosition(this.spaceData);
    this.viewModel!.windowPositions.Value =
      this.dimensionStrategy.getWindowPositions(this.spaceData);
    this.viewModel!.wallSegments.Value =
      this.dimensionStrategy.getWallSegmentIndices(this.spaceData);
    this.viewModel!.elementPositions.Value =
      this.dimensionStrategy.getLearningElementPositions(this.spaceData);
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

  private setDimensionsStrategy(templateType: LearningSpaceTemplateType): void {
    if (templateType === LearningSpaceTemplateType.None)
      this.dimensionStrategy = new GenericLearningSpaceDimensionStrategy(
        this.viewModel!.wallThickness.Value,
        this.viewModel!.baseHeight.Value,
        this.viewModel!.doorWidth.Value,
        this.viewModel!.windowWidth.Value
      );
    else
      this.dimensionStrategy = new TemplateLearningSpaceDimensionStrategy(
        this.viewModel!.wallThickness.Value,
        this.viewModel!.baseHeight.Value,
        this.viewModel!.doorWidth.Value,
        this.viewModel!.windowWidth.Value
      );
  }
}
