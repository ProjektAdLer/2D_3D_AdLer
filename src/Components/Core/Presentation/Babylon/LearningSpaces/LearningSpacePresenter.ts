import { injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IDoorPresenter from "../Door/IDoorPresenter";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import ILearningElementPresenter from "../LearningElements/ILearningElementPresenter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import LearningElementView from "../LearningElements/LearningElementView";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import IWindowPresenter from "../Window/IWindowPresenter";
import AbstractLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/AbstractLearningSpaceDimensionStrategy";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import GenericLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";
import TemplateLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/TemplateLearningSpaceDimensionStrategy";

@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
  private doorPresenter: IDoorPresenter;
  private director: IPresentationDirector;
  private dimensionStrategy: AbstractLearningSpaceDimensionStrategy;

  constructor(private viewModel: LearningSpaceViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }

    this.director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
  }

  dispose(): void {
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).unregisterAdapter(this);
  }

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.setDimensionsStrategy(spaceTO.template);

    this.viewModel.id = spaceTO.id;
    this.viewModel.spaceCornerPoints.Value =
      this.dimensionStrategy.getCornerPoints(spaceTO);
    this.viewModel.doorPosition.Value =
      this.dimensionStrategy.getEntranceDoorPosition(spaceTO);
    this.viewModel.windowPositions.Value =
      this.dimensionStrategy.getWindowPositions(spaceTO);

    this.createLearningElements(spaceTO);
    this.createWindows();
    this.createDoor();
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (spaceScoreTO.spaceID !== this.viewModel.id) return;
    if (spaceScoreTO.currentScore >= spaceScoreTO.requiredScore)
      this.openDoor();
  }

  private setDimensionsStrategy(templateType: LearningSpaceTemplateType): void {
    if (templateType === LearningSpaceTemplateType.None)
      this.dimensionStrategy = new GenericLearningSpaceDimensionStrategy(
        this.viewModel.wallThickness.Value,
        this.viewModel.baseHeight.Value,
        this.viewModel.doorWidth.Value,
        this.viewModel.windowWidth.Value
      );
    else
      this.dimensionStrategy = new TemplateLearningSpaceDimensionStrategy(
        this.viewModel.wallThickness.Value,
        this.viewModel.baseHeight.Value,
        this.viewModel.doorWidth.Value,
        this.viewModel.windowWidth.Value
      );
  }

  private openDoor(): void {
    if (!this.doorPresenter) return;
    this.doorPresenter.openDoor();
  }

  private createLearningElements(spaceTO: LearningSpaceTO): void {
    const elementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );

    let elementPositions =
      this.dimensionStrategy.getLearningElementPositions(spaceTO);

    spaceTO.elements.forEach((elementTO) => {
      // skip empty element slots
      if (!elementTO) return;

      this.director.build(elementBuilder);
      (
        elementBuilder.getPresenter() as ILearningElementPresenter
      ).presentLearningElement(elementTO, elementPositions.shift()!);
      (elementBuilder.getView() as LearningElementView).setupLearningElement();
      elementBuilder.reset();
    });
  }

  private createDoor(): void {
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    this.director.build(doorBuilder);
    this.doorPresenter = doorBuilder.getPresenter() as IDoorPresenter;
    this.doorPresenter.presentDoor(this.viewModel.doorPosition.Value);
  }

  private createWindows(): void {
    for (const windowPosition of this.viewModel.windowPositions.Value) {
      const windowBuilder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IWindowBuilder
      );

      this.director.build(windowBuilder);
      (windowBuilder.getPresenter() as IWindowPresenter).presentWindow(
        windowPosition
      );
    }
  }
}
