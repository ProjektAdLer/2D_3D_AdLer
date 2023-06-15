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
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import IWindowPresenter from "../Window/IWindowPresenter";
import AbstractLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/AbstractLearningSpaceDimensionStrategy";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import GenericLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";
import TemplateLearningSpaceDimensionStrategy from "./LearningSpaceDimensionStrategies/TemplateLearningSpaceDimensionStrategy";
import IStandInDecorationPresenter from "../StandInDecoration/IStandInDecorationPresenter";
import StandInDecorationView from "../StandInDecoration/StandInDecorationView";
import IDecorationPresenter from "../Decoration/IDecorationPresenter";

@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
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
    this.viewModel.learningSpaceTemplateType.Value = spaceTO.template;
    this.viewModel.spaceCornerPoints.Value =
      this.dimensionStrategy.getCornerPoints(spaceTO);
    this.viewModel.exitDoorPosition.Value =
      this.dimensionStrategy.getExitDoorPosition(spaceTO);
    this.viewModel.entryDoorPosition.Value =
      this.dimensionStrategy.getEntryDoorPosition(spaceTO);
    this.viewModel.windowPositions.Value =
      this.dimensionStrategy.getWindowPositions(spaceTO);
    this.viewModel.wallSegments.Value =
      this.dimensionStrategy.getWallSegmentIndices(spaceTO);

    this.createLearningElements(spaceTO);
    this.createWindows();
    if (this.viewModel.exitDoorPosition.Value[0]) this.createExitDoor();
    if (this.viewModel.entryDoorPosition.Value[0]) this.createEntryDoor();
    this.createDecoration();
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

  private createLearningElements(spaceTO: LearningSpaceTO): void {
    const elementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );
    const standInDecorationBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IStandInDecorationBuilder
    );

    let elementPositions =
      this.dimensionStrategy.getLearningElementPositions(spaceTO);

    for (let i = 0; i < spaceTO.elements.length; i++) {
      if (!spaceTO.elements[i]) {
        this.director.build(standInDecorationBuilder);
        (
          standInDecorationBuilder.getPresenter() as IStandInDecorationPresenter
        ).presentStandInDecoration(
          elementPositions.shift()!,
          spaceTO.name,
          i + 1
        );
        (
          standInDecorationBuilder.getView() as StandInDecorationView
        ).setupStandInDecoration();
        standInDecorationBuilder.reset();
      } else {
        this.director.build(elementBuilder);
        (
          elementBuilder.getPresenter() as ILearningElementPresenter
        ).presentLearningElement(
          spaceTO.elements[i]!,
          elementPositions.shift()!
        );
        (
          elementBuilder.getView() as LearningElementView
        ).setupLearningElement();
        elementBuilder.reset();
      }
    }
  }

  private createExitDoor(): void {
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    this.director.build(doorBuilder);
    (doorBuilder.getPresenter() as IDoorPresenter).presentDoor(
      this.viewModel.exitDoorPosition.Value,
      true,
      this.viewModel.id
    );
  }

  private createEntryDoor(): void {
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    this.director.build(doorBuilder);
    (doorBuilder.getPresenter() as IDoorPresenter).presentDoor(
      this.viewModel.entryDoorPosition.Value,
      false,
      this.viewModel.id
    );
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

  private createDecoration(): void {
    const decorationBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDecorationBuilder
    );

    this.director.build(decorationBuilder);
    (
      decorationBuilder.getPresenter() as IDecorationPresenter
    ).presentDecoration(this.viewModel.learningSpaceTemplateType.Value);
  }
}
