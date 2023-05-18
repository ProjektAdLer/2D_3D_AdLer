import { Vector2, Vector3 } from "@babylonjs/core";
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
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import LearningElementView from "../LearningElements/LearningElementView";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import IWindowPresenter from "../Window/IWindowPresenter";

@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
  private doorPresenter: IDoorPresenter;
  private windowPresenter: IWindowPresenter;

  constructor(private viewModel: LearningSpaceViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }
  }

  dispose(): void {
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).unregisterAdapter(this);
  }

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.createAmbience();
    this.setViewModelData(spaceTO);
    this.createLearningElements(spaceTO.elements);
    this.createWindow();
    this.createDoor();
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (spaceScoreTO.spaceID !== this.viewModel.id) return;
    if (spaceScoreTO.currentScore >= spaceScoreTO.requiredScore)
      this.openDoor();
  }

  private openDoor(): void {
    if (!this.doorPresenter) return;
    this.doorPresenter.openDoor();
  }

  private setViewModelData(spaceTO: LearningSpaceTO): void {
    this.viewModel.id = spaceTO.id;
    this.setLearningSpaceDimensions(spaceTO);
    this.setLearningSpaceCornersSquare();
  }

  private setLearningSpaceDimensions(spaceTO: LearningSpaceTO): void {
    this.viewModel.spaceLength.Value = (spaceTO.elements.length / 2) * 4;
    this.viewModel.spaceWidth.Value = spaceTO.elements.length > 1 ? 8 : 6;
  }

  private setLearningSpaceCornersSquare(): void {
    const spaceLength = this.viewModel.spaceLength.Value;
    const spaceWidth = this.viewModel.spaceWidth.Value;
    const wallThickness = this.viewModel.wallThickness.Value;
    this.viewModel.spaceCornerPoints.Value = [
      new Vector2(spaceWidth + wallThickness, spaceLength + wallThickness),
      new Vector2(-spaceWidth - wallThickness, spaceLength + wallThickness),
      new Vector2(-spaceWidth - wallThickness, -spaceLength - wallThickness),
      new Vector2(spaceWidth + wallThickness, -spaceLength - wallThickness),
    ];
  }

  private createLearningElements(
    elementTOs: (LearningElementTO | null)[]
  ): void {
    const director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const elementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );

    let elementPositions = this.getLearningElementPositions(elementTOs.length);

    elementTOs.forEach((elementTO) => {
      // skip empty element slots
      if (!elementTO) return;

      director.build(elementBuilder);
      (
        elementBuilder.getPresenter() as ILearningElementPresenter
      ).presentLearningElement(elementTO, elementPositions.shift()!);
      (elementBuilder.getView() as LearningElementView).setupLearningElement();
      elementBuilder.reset();
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
          this.viewModel.spaceWidth.Value * sideOffset * sideAlternation,
          this.viewModel.baseHeight.Value,
          (this.viewModel.spaceLength.Value / (elementCount + 1)) * (i + 1) -
            this.viewModel.spaceLength.Value / 2
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
    const doorPosition = [
      new Vector3(
        this.viewModel.doorWidth.Value / 2,
        this.viewModel.baseHeight.Value,
        -this.viewModel.spaceLength.Value - this.viewModel.wallThickness.Value
      ),
      -90,
    ];
    this.viewModel.doorPosition.Value = doorPosition as [Vector3, number];
    return doorPosition as [Vector3, number];
  }

  private createAmbience(): void {
    const director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const ambienceBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IAmbienceBuilder
    );

    director.build(ambienceBuilder);
  }
  private createWindow(): void {
    const director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const windowBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IWindowBuilder
    );

    director.build(windowBuilder);
    this.windowPresenter = windowBuilder.getPresenter() as IWindowPresenter;
    this.windowPresenter.presentWindow(this.getWindowPosition());
  }
  private getWindowPosition(): [Vector3, number] {
    const windowPosition = [
      new Vector3(
        this.viewModel.windowWidth.Value + 3,
        this.viewModel.baseHeight.Value,
        -this.viewModel.spaceLength.Value - this.viewModel.wallThickness.Value
      ),
      -90,
    ];
    this.viewModel.windowPosition.Value = windowPosition as [Vector3, number];
    return windowPosition as [Vector3, number];
  }
}
