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
import LearningElementView from "../LearningElements/LearningElementView";
import IWindowPresenter from "../Window/IWindowPresenter";
import IStandInDecorationPresenter from "../StandInDecoration/IStandInDecorationPresenter";
import StandInDecorationView from "../StandInDecoration/StandInDecorationView";
import type IDecorationBuilder from "../Decoration/IDecorationBuilder";
@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
  private director: IPresentationDirector;
  private decorationBuilder: IDecorationBuilder;

  constructor(private viewModel: LearningSpaceViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }

    this.director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    this.decorationBuilder = CoreDIContainer.get<IDecorationBuilder>(
      BUILDER_TYPES.IDecorationBuilder
    );
  }

  async asyncSetupSpace(spaceTO: LearningSpaceTO): Promise<void> {
    this.createLearningElements(spaceTO);
    this.createWindows();
    if (this.viewModel.exitDoorPosition.Value) this.createExitDoor();
    if (this.viewModel.entryDoorPosition.Value) this.createEntryDoor();
    this.decorationBuilder.spaceTemplate = spaceTO.template;
    const decorationCompleted = this.director.buildAsync(
      this.decorationBuilder
    );

    console.log("LearningSpacePresenter", decorationCompleted);
  }

  private createLearningElements(spaceTO: LearningSpaceTO): void {
    const elementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );
    const standInDecorationBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IStandInDecorationBuilder
    );

    for (let i = 0; i < spaceTO.elements.length; i++) {
      if (!spaceTO.elements[i]) {
        this.director.build(standInDecorationBuilder);
        (
          standInDecorationBuilder.getPresenter() as IStandInDecorationPresenter
        ).presentStandInDecoration(
          this.viewModel.elementPositions.Value.shift()!,
          spaceTO.name,
          i + 1
        );
        (
          standInDecorationBuilder.getView() as StandInDecorationView
        ).setupStandInDecoration();
      } else {
        this.director.build(elementBuilder);
        (
          elementBuilder.getPresenter() as ILearningElementPresenter
        ).presentLearningElement(
          spaceTO.elements[i]!,
          this.viewModel.elementPositions.Value.shift()!
        );
        (
          elementBuilder.getView() as LearningElementView
        ).setupLearningElement();
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
}
