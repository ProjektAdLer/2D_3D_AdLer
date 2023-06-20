import { injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IDoorPresenter from "../Door/IDoorPresenter";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import IWindowPresenter from "../Window/IWindowPresenter";
import IStandInDecorationPresenter from "../StandInDecoration/IStandInDecorationPresenter";
import StandInDecorationView from "../StandInDecoration/StandInDecorationView";
import type IDecorationBuilder from "../Decoration/IDecorationBuilder";
import ILearningElementBuilder from "../LearningElements/ILearningElementBuilder";

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
    if (this.viewModel.exitDoorPosition) this.createExitDoor();
    if (this.viewModel.entryDoorPosition) this.createEntryDoor();
    this.decorationBuilder.spaceTemplate = spaceTO.template;
    const decorationCompleted = this.director.buildAsync(
      this.decorationBuilder
    );

    await Promise.all([decorationCompleted]);
  }

  private async createLearningElements(
    spaceTO: LearningSpaceTO
  ): Promise<void> {
    const elementBuilder = CoreDIContainer.get<ILearningElementBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );
    const standInDecorationBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IStandInDecorationBuilder
    );

    const loadingCompletePromises: Promise<void>[] = [];

    for (let i = 0; i < spaceTO.elements.length; i++) {
      if (!spaceTO.elements[i]) {
        // create stand in decoration for empty slots
        this.director.build(standInDecorationBuilder);
        (
          standInDecorationBuilder.getPresenter() as IStandInDecorationPresenter
        ).presentStandInDecoration(
          this.viewModel.elementPositions.shift()!,
          spaceTO.name,
          i + 1
        );
        (
          standInDecorationBuilder.getView() as StandInDecorationView
        ).setupStandInDecoration();
      } else {
        // create learning element for non-empty slots
        elementBuilder.elementData = spaceTO.elements[i]!;
        elementBuilder.elementPosition =
          this.viewModel.elementPositions.shift()!;
        loadingCompletePromises.push(this.director.buildAsync(elementBuilder));
      }
    }

    await Promise.all(loadingCompletePromises);
  }

  private createExitDoor(): void {
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    this.director.build(doorBuilder);
    (doorBuilder.getPresenter() as IDoorPresenter).presentDoor(
      this.viewModel.exitDoorPosition,
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
      this.viewModel.entryDoorPosition,
      false,
      this.viewModel.id
    );
  }

  private createWindows(): void {
    for (const windowPosition of this.viewModel.windowPositions) {
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
