import { injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import IWindowPresenter from "../Window/IWindowPresenter";
import type IDecorationBuilder from "../Decoration/IDecorationBuilder";
import ILearningElementBuilder from "../LearningElements/ILearningElementBuilder";
import IStandInDecorationBuilder from "../StandInDecoration/IStandInDecorationBuilder";
import IDoorBuilder from "../Door/IDoorBuilder";
import IWindowBuilder from "../Window/IWindowBuilder";
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
    await this.fillLearningElementSlots(spaceTO);
    this.createWindows();
    if (this.viewModel.exitDoorPosition) await this.createExitDoor();
    if (this.viewModel.entryDoorPosition) await this.createEntryDoor();
    this.decorationBuilder.spaceTemplate = spaceTO.template;
    await this.director.buildAsync(this.decorationBuilder);
  }

  private async fillLearningElementSlots(
    spaceTO: LearningSpaceTO
  ): Promise<void> {
    const loadingCompletePromises: Promise<void>[] = [];

    for (let i = 0; i < spaceTO.elements.length; i++) {
      if (!spaceTO.elements[i]) {
        // create stand in decoration for empty slots
        const standInDecorationBuilder =
          CoreDIContainer.get<IStandInDecorationBuilder>(
            BUILDER_TYPES.IStandInDecorationBuilder
          );
        let elementPosition = this.viewModel.elementPositions.shift()!;
        standInDecorationBuilder.position = elementPosition[0];
        standInDecorationBuilder.rotation = elementPosition[1];
        standInDecorationBuilder.spaceName = spaceTO.name;
        standInDecorationBuilder.slotNumber = i;
        loadingCompletePromises.push(
          this.director.buildAsync(standInDecorationBuilder)
        );
      } else {
        // create learning element for non-empty slots
        const elementBuilder = CoreDIContainer.get<ILearningElementBuilder>(
          BUILDER_TYPES.ILearningElementBuilder
        );
        elementBuilder.elementData = spaceTO.elements[i]!;
        elementBuilder.elementPosition =
          this.viewModel.elementPositions.shift()!;
        loadingCompletePromises.push(this.director.buildAsync(elementBuilder));
      }
    }

    await Promise.all(loadingCompletePromises);
  }

  private async createExitDoor(): Promise<void> {
    const exitDoorBuilder = CoreDIContainer.get<IDoorBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );
    let exitDoorPosition = this.viewModel.exitDoorPosition;
    exitDoorBuilder.position = exitDoorPosition[0];
    exitDoorBuilder.rotation = exitDoorPosition[1];
    exitDoorBuilder.spaceID = this.viewModel.id;
    exitDoorBuilder.isExit = true;
    await this.director.buildAsync(exitDoorBuilder);
  }

  private async createEntryDoor(): Promise<void> {
    const entryDoorBuilder = CoreDIContainer.get<IDoorBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );
    let entryDoorPosition = this.viewModel.entryDoorPosition;
    entryDoorBuilder.position = entryDoorPosition[0];
    entryDoorBuilder.rotation = entryDoorPosition[1];
    entryDoorBuilder.spaceID = this.viewModel.id;
    entryDoorBuilder.isExit = false;
    await this.director.buildAsync(entryDoorBuilder);
  }

  private async createWindows(): Promise<void> {
    const loadingWindowPromises: Promise<void>[] = [];
    for (const windowPosition of this.viewModel.windowPositions) {
      const windowBuilder = CoreDIContainer.get<IWindowBuilder>(
        BUILDER_TYPES.IWindowBuilder
      );
      windowBuilder.position = windowPosition[0];
      windowBuilder.rotation = windowPosition[1];
      loadingWindowPromises.push(this.director.buildAsync(windowBuilder));
    }
    await Promise.all(loadingWindowPromises);
  }
}
