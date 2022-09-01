import { Vector2, Vector3 } from "@babylonjs/core";
import { injectable } from "inversify";
import {
  LearningElementTO,
  LearningRoomTO,
} from "../../../Ports/LearningWorldPort/ILearningWorldPort";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IScorePanelPresenter from "../../React/ScorePanel/IScorePanelPresenter";
import IDoorPresenter from "../Door/IDoorPresenter";
import LearningRoomViewModel from "./LearningRoomViewModel";
import ILearningRoomPresenter from "./ILearningRoomPresenter";
import ILearningElementPresenter from "../LearningElement/ILearningElementPresenter";

@injectable()
export default class LearningRoomPresenter implements ILearningRoomPresenter {
  private doorPresenter: IDoorPresenter;
  private scorePanelPresenter: IScorePanelPresenter;

  constructor(private viewModel: LearningRoomViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }
  }

  get LearningRoomId(): number {
    return this.viewModel.id;
  }

  presentLearningRoom(learningRoomTO: LearningRoomTO): void {
    this.setViewModelData(learningRoomTO);
    this.createLearningElements(learningRoomTO.learningElements);
    this.createDoor();
  }

  openDoor(): void {
    if (!this.doorPresenter) return;
    this.doorPresenter.openDoor();
  }

  private setViewModelData(learningRoomTO: LearningRoomTO): void {
    this.viewModel.id = learningRoomTO.id;
    this.setRoomDimensions(learningRoomTO);
    this.setRoomCornersSquare();
  }

  private setRoomDimensions(learningRoomTO: LearningRoomTO): void {
    this.viewModel.roomLength.Value =
      (learningRoomTO.learningElements.length / 2) * 4;
    this.viewModel.roomWidth.Value =
      learningRoomTO.learningElements.length > 1 ? 8 : 6;
  }

  private setRoomCornersSquare(): void {
    const roomLength = this.viewModel.roomLength.Value;
    const roomWidth = this.viewModel.roomWidth.Value;
    const wallThickness = this.viewModel.wallThickness.Value;
    this.viewModel.roomCornerPoints.Value = [
      new Vector2(roomWidth + wallThickness, roomLength + wallThickness),
      new Vector2(-roomWidth - wallThickness, roomLength + wallThickness),
      new Vector2(-roomWidth - wallThickness, -roomLength - wallThickness),
      new Vector2(roomWidth + wallThickness, -roomLength - wallThickness),
    ];
  }

  private createLearningElements(
    learningElementTOs: LearningElementTO[]
  ): void {
    const director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const learningElementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );

    let elementPositions = this.getLearningElementPositions(
      learningElementTOs.length
    );

    learningElementTOs.forEach((elementTO) => {
      director.build(learningElementBuilder);
      (
        learningElementBuilder.getPresenter() as ILearningElementPresenter
      ).presentLearningElement(elementTO, elementPositions.shift()!);
      learningElementBuilder.reset();
    });
  }

  private getLearningElementPositions(
    elementCount: number
  ): [Vector3, number][] {
    let positions: [Vector3, number][] = [];
    let sideAlternation = -1;
    const sideOffset = 1;

    for (let i = 0; i < elementCount; i++) {
      positions.push([
        new Vector3(
          this.viewModel.roomWidth.Value * sideOffset * sideAlternation,
          this.viewModel.baseHeight.Value,
          (this.viewModel.roomLength.Value / (elementCount + 1)) * (i + 1) -
            this.viewModel.roomLength.Value / 2
        ),
        sideAlternation >= 0 ? 0 : 180,
      ]);
      sideAlternation *= -1;
    }
    return positions;
  }

  private createDoor(): void {
    const director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    director.build(doorBuilder);
    this.doorPresenter = doorBuilder.getPresenter() as IDoorPresenter;
    this.doorPresenter.presentDoor(this.getDoorPosition());
  }

  private getDoorPosition(): [Vector3, number] {
    return [
      new Vector3(
        this.viewModel.doorWidth.Value / 2,
        this.viewModel.baseHeight.Value,
        -this.viewModel.roomLength.Value - this.viewModel.wallThickness.Value
      ),
      -90,
    ];
  }
}
