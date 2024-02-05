import { injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import type IDecorationBuilder from "../Decoration/IDecorationBuilder";
import ILearningElementBuilder from "../LearningElements/ILearningElementBuilder";
import IStandInDecorationBuilder from "../StandInDecoration/IStandInDecorationBuilder";
import IDoorBuilder from "../Door/IDoorBuilder";
import IWindowBuilder from "../Window/IWindowBuilder";
import SeededRNG from "../../Utils/SeededRNG";
import { Vector3 } from "@babylonjs/core/Maths/math";
import IDoorPresenter from "../Door/IDoorPresenter";
import ILearningElementPresenter from "../LearningElements/ILearningElementPresenter";
import IStoryNPCPresenter from "../StoryNPC/IStoryNPCPresenter";
import IStoryNPCBuilder from "../StoryNPC/IStoryNPCBuilder";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
  private director: IPresentationDirector;
  private decorationBuilder: IDecorationBuilder;
  private doorPresenters: IDoorPresenter[] = [];
  private elementPresenters: ILearningElementPresenter[] = [];
  private storyNPCPresenters: IStoryNPCPresenter;

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
    await this.createWindows();
    if (this.viewModel.exitDoorPosition) await this.createExitDoor(spaceTO);
    if (this.viewModel.entryDoorPosition) await this.createEntryDoor();
    this.decorationBuilder.spaceTemplate = spaceTO.template;
    await this.director.buildAsync(this.decorationBuilder);
    await this.createStoryNPCs(spaceTO);
  }

  broadcastAvatarPosition(position: Vector3, interactionRadius: number): void {
    for (const doorPresenter of this.doorPresenters) {
      doorPresenter.onAvatarPositionChanged(position, interactionRadius);
    }
    for (const elementPresenter of this.elementPresenters) {
      elementPresenter.onAvatarPositionChanged(position, interactionRadius);
    }
    if (this.storyNPCPresenters)
      this.storyNPCPresenters.onAvatarPositionChanged(
        position,
        interactionRadius
      );
  }

  private async fillLearningElementSlots(
    spaceTO: LearningSpaceTO
  ): Promise<void> {
    const loadingCompletePromises: Promise<void>[] = [];
    const elementBuilders: ILearningElementBuilder[] = [];

    for (let i = 0; i < spaceTO.elements.length; i++) {
      let elementPosition = this.viewModel.elementPositions.shift()!;

      if (!spaceTO.elements[i]) {
        const seededRNG = new SeededRNG(i.toString() + spaceTO.name);
        const randomValue = seededRNG.seededRandom();

        if (randomValue <= this.viewModel.standInDecoSpawnProbability) {
          // create stand in decoration for empty slots
          const standInDecorationBuilder =
            CoreDIContainer.get<IStandInDecorationBuilder>(
              BUILDER_TYPES.IStandInDecorationBuilder
            );

          standInDecorationBuilder.position = elementPosition[0];
          standInDecorationBuilder.rotation = elementPosition[1];
          standInDecorationBuilder.spaceName = spaceTO.name;
          standInDecorationBuilder.slotNumber = i;
          standInDecorationBuilder.theme = this.viewModel.theme;

          loadingCompletePromises.push(
            this.director.buildAsync(standInDecorationBuilder)
          );
        }
      } else {
        // create learning element for non-empty slots
        const elementBuilder = CoreDIContainer.get<ILearningElementBuilder>(
          BUILDER_TYPES.ILearningElementBuilder
        );

        elementBuilder.elementData = spaceTO.elements[i]!;
        elementBuilder.elementData.theme = this.viewModel.theme;
        elementBuilder.elementPosition = elementPosition;

        loadingCompletePromises.push(this.director.buildAsync(elementBuilder));
        elementBuilders.push(elementBuilder);
      }
    }
    await Promise.all(loadingCompletePromises);

    for (const elementBuilder of elementBuilders)
      this.elementPresenters.push(elementBuilder.getPresenter());
  }

  private async createExitDoor(spaceTO: LearningSpaceTO): Promise<void> {
    const exitDoorBuilder = CoreDIContainer.get<IDoorBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );
    let exitDoorPosition = this.viewModel.exitDoorPosition;
    exitDoorBuilder.position = exitDoorPosition[0];
    exitDoorBuilder.rotation = exitDoorPosition[1];
    exitDoorBuilder.theme = this.viewModel.theme;
    exitDoorBuilder.spaceID = this.viewModel.id;
    exitDoorBuilder.isExit = true;
    exitDoorBuilder.isOpen = spaceTO.currentScore >= spaceTO.requiredScore;

    await this.director.buildAsync(exitDoorBuilder);

    this.doorPresenters.push(exitDoorBuilder.getPresenter());
  }

  private async createEntryDoor(): Promise<void> {
    const entryDoorBuilder = CoreDIContainer.get<IDoorBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );
    let entryDoorPosition = this.viewModel.entryDoorPosition;
    entryDoorBuilder.position = entryDoorPosition[0];
    entryDoorBuilder.rotation = entryDoorPosition[1];
    entryDoorBuilder.theme = this.viewModel.theme;
    entryDoorBuilder.spaceID = this.viewModel.id;
    entryDoorBuilder.isExit = false;
    entryDoorBuilder.isOpen = false;

    await this.director.buildAsync(entryDoorBuilder);

    this.doorPresenters.push(entryDoorBuilder.getPresenter());
  }

  private async createWindows(): Promise<void> {
    const loadingWindowPromises: Promise<void>[] = [];
    for (const windowPosition of this.viewModel.windowPositions) {
      const windowBuilder = CoreDIContainer.get<IWindowBuilder>(
        BUILDER_TYPES.IWindowBuilder
      );
      windowBuilder.position = windowPosition[0];
      windowBuilder.rotation = windowPosition[1];
      windowBuilder.theme = this.viewModel.theme;
      loadingWindowPromises.push(this.director.buildAsync(windowBuilder));
    }
    await Promise.all(loadingWindowPromises);
  }

  private async createStoryNPCs(spaceTO: LearningSpaceTO): Promise<void> {
    for (const storyElement of spaceTO.storyElements) {
      if (storyElement.storyType !== StoryElementType.None) {
        const storyNPCBuilder = CoreDIContainer.get<IStoryNPCBuilder>(
          BUILDER_TYPES.IStoryNPCBuilder
        );
        storyNPCBuilder.storyType = storyElement.storyType;
        storyNPCBuilder.modelType = storyElement.modelType!;

        storyNPCBuilder.learningSpaceTemplateType =
          this.viewModel.learningSpaceTemplateType;

        storyNPCBuilder.isInCutScene = false;
        if (
          (storyElement.storyType & StoryElementType.Intro) ===
          StoryElementType.Intro
        ) {
          storyNPCBuilder.isInCutScene = spaceTO.currentScore === 0;
        }
        await this.director.buildAsync(storyNPCBuilder);

        this.storyNPCPresenters = storyNPCBuilder.getPresenter();
      }
    }
  }
}
