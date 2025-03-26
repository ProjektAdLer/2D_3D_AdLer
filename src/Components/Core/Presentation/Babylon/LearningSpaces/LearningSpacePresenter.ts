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
import IDoorPresenter from "../Door/IDoorPresenter";
import ILearningElementPresenter from "../LearningElements/ILearningElementPresenter";
import IStoryNPCPresenter from "../StoryNPC/IStoryNPCPresenter";
import IStoryNPCBuilder from "../StoryNPC/IStoryNPCBuilder";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import type {
  LearningSpaceWallSegmentLocationData,
  LearningSpaceCornerPoleLocationData,
} from "./LearningSpaceViewModel";

@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
  private director: IPresentationDirector;
  private decorationBuilder: IDecorationBuilder;
  private doorPresenters: IDoorPresenter[] = [];
  private elementPresenters: ILearningElementPresenter[] = [];
  private storyNPCPresenters: IStoryNPCPresenter[] = [];

  constructor(private viewModel: LearningSpaceViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }

    this.director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector,
    );
    this.decorationBuilder = CoreDIContainer.get<IDecorationBuilder>(
      BUILDER_TYPES.IDecorationBuilder,
    );
  }

  async asyncSetupSpace(spaceTO: LearningSpaceTO): Promise<void> {
    this.computeWallCoordinates();
    await this.fillLearningElementSlots(spaceTO);
    await this.createWindows();
    if (this.viewModel.exitDoorPosition) await this.createExitDoor(spaceTO);
    if (this.viewModel.entryDoorPosition) await this.createEntryDoor();
    this.decorationBuilder.spaceTemplate = spaceTO.template;
    this.decorationBuilder.theme = spaceTO.theme;
    await this.director.buildAsync(this.decorationBuilder);
    await this.createStoryNPCs(spaceTO);
  }

  private async fillLearningElementSlots(
    spaceTO: LearningSpaceTO,
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
              BUILDER_TYPES.IStandInDecorationBuilder,
            );

          standInDecorationBuilder.position = elementPosition[0];
          standInDecorationBuilder.rotation = elementPosition[1];
          standInDecorationBuilder.spaceName = spaceTO.name;
          standInDecorationBuilder.slotNumber = i;
          standInDecorationBuilder.theme = this.viewModel.theme;

          loadingCompletePromises.push(
            this.director.buildAsync(standInDecorationBuilder),
          );
        }
      } else {
        // create learning element for non-empty slots
        const elementBuilder = CoreDIContainer.get<ILearningElementBuilder>(
          BUILDER_TYPES.ILearningElementBuilder,
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
      BUILDER_TYPES.IDoorBuilder,
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
      BUILDER_TYPES.IDoorBuilder,
    );
    let entryDoorPosition = this.viewModel.entryDoorPosition;
    entryDoorBuilder.position = entryDoorPosition[0];
    entryDoorBuilder.rotation = entryDoorPosition[1];
    entryDoorBuilder.theme = this.viewModel.theme;
    entryDoorBuilder.spaceID = this.viewModel.id;
    entryDoorBuilder.isExit = false;
    entryDoorBuilder.isOpen = true;

    await this.director.buildAsync(entryDoorBuilder);

    this.doorPresenters.push(entryDoorBuilder.getPresenter());
  }

  private async createWindows(): Promise<void> {
    const loadingWindowPromises: Promise<void>[] = [];
    for (const windowPosition of this.viewModel.windowPositions) {
      const windowBuilder = CoreDIContainer.get<IWindowBuilder>(
        BUILDER_TYPES.IWindowBuilder,
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
          BUILDER_TYPES.IStoryNPCBuilder,
        );
        storyNPCBuilder.storyType = storyElement.storyType;
        storyNPCBuilder.modelType = storyElement.modelType!;
        storyNPCBuilder.learningSpaceTemplateType =
          this.viewModel.learningSpaceTemplateType;
        storyNPCBuilder.noLearningElementHasScored =
          spaceTO.elements.find((e) => e?.hasScored) === undefined;
        storyNPCBuilder.learningSpaceCompleted =
          spaceTO.currentScore >= spaceTO.requiredScore;

        await this.director.buildAsync(storyNPCBuilder);

        this.storyNPCPresenters.push(storyNPCBuilder.getPresenter());
      }
    }
  }

  private computeWallCoordinates(): void {
    let examinedCornerPoints: Set<number> = new Set<number>();
    let segmentData: LearningSpaceWallSegmentLocationData | null = null;
    let previousSegmentData: LearningSpaceWallSegmentLocationData | null = null;
    let firstSegmentData: LearningSpaceWallSegmentLocationData | null = null;
    let cornerPoleData: LearningSpaceCornerPoleLocationData | null = null;

    if (this.viewModel.wallSegments) {
      this.viewModel.wallSegments.forEach((wallSegment) => {
        segmentData = this.computeWallSegmentData(wallSegment);
        if (examinedCornerPoints.has(wallSegment.start)) {
          cornerPoleData = this.computeCornerPoleData(
            segmentData,
            previousSegmentData!,
          );
        } else examinedCornerPoints.add(wallSegment.start);
        if (examinedCornerPoints.has(wallSegment.end)) {
          cornerPoleData = this.computeCornerPoleData(
            firstSegmentData!,
            segmentData!,
          );
        } else examinedCornerPoints.add(wallSegment.end);
        previousSegmentData = segmentData;
        if (firstSegmentData === null) firstSegmentData = segmentData;
        this.viewModel.wallSegmentLocations.push(segmentData);
        if (cornerPoleData)
          this.viewModel.cornerPoleLocations.push(cornerPoleData);
      });
    }
  }

  private computeWallSegmentData(wallSegment: {
    start: number;
    end: number;
  }): LearningSpaceWallSegmentLocationData {
    let startCornerPoint = this.viewModel.spaceCornerPoints[wallSegment.start];
    let endCornerPoint = this.viewModel.spaceCornerPoints[wallSegment.end];
    let angle = Math.atan2(
      endCornerPoint.z - startCornerPoint.z,
      endCornerPoint.x - startCornerPoint.x,
    );
    let startPosition = { x: 0, z: 0 };
    let endPosition = { x: 0, z: 0 };

    startPosition.x =
      startCornerPoint.x - (Math.sin(angle) * this.viewModel.wallThickness) / 2;
    startPosition.z =
      startCornerPoint.z + (Math.cos(angle) * this.viewModel.wallThickness) / 2;
    endPosition.x =
      endCornerPoint.x - (Math.sin(angle) * this.viewModel.wallThickness) / 2;
    endPosition.z =
      endCornerPoint.z + (Math.cos(angle) * this.viewModel.wallThickness) / 2;

    return {
      index: wallSegment.start,
      startPoint: { x: startPosition.x, z: startPosition.z },
      endPoint: { x: endPosition.x, z: endPosition.z },
      angle: angle,
    };
  }

  private computeCornerPoleData(
    segmentData: LearningSpaceWallSegmentLocationData,
    previousSegmentData: LearningSpaceWallSegmentLocationData,
  ): LearningSpaceCornerPoleLocationData {
    let cornerPoint = this.viewModel.spaceCornerPoints[segmentData.index];
    let angle = (segmentData.angle + previousSegmentData.angle) / 2;
    let polePosition = { x: 0, z: 0 };

    polePosition.x =
      cornerPoint.x - Math.sin(angle) * this.viewModel.wallThickness * 0.75;
    polePosition.z =
      cornerPoint.z + Math.cos(angle) * this.viewModel.wallThickness * 0.75;

    return {
      index: segmentData.index,
      position: polePosition,
    };
  }
}
