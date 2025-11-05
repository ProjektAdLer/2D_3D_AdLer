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

  private isPresenterCompleted: Promise<void>;
  private resolveIsPresenterCompleted: (
    value: void | PromiseLike<void>,
  ) => void;
  private isViewCompleted: Promise<void>;
  private resolveIsViewCompleted: (value: void | PromiseLike<void>) => void;

  constructor() {
    super(
      LearningSpaceViewModel,
      LearningSpaceController,
      LearningSpaceView,
      LearningSpacePresenter,
    );

    this.setupPromises();
  }

  override reset(): void {
    super.reset();
    this.setupPromises();
  }

  override buildViewModel(): void {
    if (!this.spaceData)
      throw new Error(
        "Space data is not defined. Set before using the builder.",
      );

    super.buildViewModel();
    this.viewModel!.id = this.spaceData.id;
    this.viewModel!.learningSpaceTemplateType = this.spaceData.template;
    this.viewModel!.theme = this.spaceData.theme;

    this.setDimensionsStrategy(this.spaceData.template);
    this.viewModel!.spaceCornerPoints = this.dimensionStrategy.getCornerPoints(
      this.spaceData,
    );
    this.viewModel!.exitDoorPosition =
      this.dimensionStrategy.getExitDoorPosition(this.spaceData);
    this.viewModel!.entryDoorPosition =
      this.dimensionStrategy.getEntryDoorPosition(this.spaceData);
    this.viewModel!.windowPositions = this.dimensionStrategy.getWindowPositions(
      this.spaceData,
    );
    this.viewModel!.lightPositions = this.dimensionStrategy.getLightPositions(
      this.spaceData,
    );
    this.viewModel!.wallSegments = this.dimensionStrategy.getWallSegmentIndices(
      this.spaceData,
    );
    this.viewModel!.elementPositions =
      this.dimensionStrategy.getLearningElementPositions(this.spaceData);
  }

  override buildPresenter(): void {
    super.buildPresenter();

    this.presenter!.asyncSetupSpace(this.spaceData).then(
      () => {
        this.resolveIsPresenterCompleted();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  override buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => {
        this.resolveIsViewCompleted();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  private setupPromises(): void {
    this.isPresenterCompleted = new Promise((resolve) => {
      this.resolveIsPresenterCompleted = resolve;
    });
    this.isViewCompleted = new Promise((resolve) => {
      this.resolveIsViewCompleted = resolve;
    });
    this.isCompleted = Promise.all([
      this.isPresenterCompleted,
      this.isViewCompleted,
    ]).then(() => Promise.resolve());
  }

  private setDimensionsStrategy(templateType: LearningSpaceTemplateType): void {
    if (templateType === LearningSpaceTemplateType.None)
      this.dimensionStrategy = new GenericLearningSpaceDimensionStrategy(
        this.viewModel!.wallThickness,
        this.viewModel!.baseHeight,
        this.viewModel!.doorWidth,
        this.viewModel!.windowWidth,
      );
    else
      this.dimensionStrategy = new TemplateLearningSpaceDimensionStrategy(
        this.viewModel!.wallThickness,
        this.viewModel!.baseHeight,
        this.viewModel!.doorWidth,
        this.viewModel!.windowWidth,
      );
  }
}
