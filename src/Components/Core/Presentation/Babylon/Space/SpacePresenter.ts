import { Vector2, Vector3 } from "@babylonjs/core";
import { injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IScorePanelPresenter from "../../React/SpaceDisplay/ScorePanel/IScorePanelPresenter";
import IDoorPresenter from "../Door/IDoorPresenter";
import SpaceViewModel from "./SpaceViewModel";
import ISpacePresenter from "./ISpacePresenter";
import IElementPresenter from "../Elements/IElementPresenter";
import SpaceTO from "src/Components/Core/Application/DataTransportObjects/SpaceTO";
import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";

@injectable()
export default class SpacePresenter implements ISpacePresenter {
  private doorPresenter: IDoorPresenter;
  private scorePanelPresenter: IScorePanelPresenter;

  constructor(private viewModel: SpaceViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }
  }

  get SpaceId(): number {
    return this.viewModel.id;
  }

  presentSpace(spaceTO: SpaceTO): void {
    this.setViewModelData(spaceTO);
    this.createElements(spaceTO.elements);
    this.createDoor();
  }

  openDoor(): void {
    if (!this.doorPresenter) return;
    this.doorPresenter.openDoor();
  }

  private setViewModelData(spaceTO: SpaceTO): void {
    this.viewModel.id = spaceTO.id;
    this.setSpaceDimensions(spaceTO);
    this.setSpaceCornersSquare();
  }

  private setSpaceDimensions(spaceTO: SpaceTO): void {
    this.viewModel.spaceLength.Value = (spaceTO.elements.length / 2) * 4;
    this.viewModel.spaceWidth.Value = spaceTO.elements.length > 1 ? 8 : 6;
  }

  private setSpaceCornersSquare(): void {
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

  private createElements(elementTOs: ElementTO[]): void {
    const director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const elementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IElementBuilder
    );

    let elementPositions = this.getElementPositions(elementTOs.length);

    elementTOs.forEach((elementTO) => {
      director.build(elementBuilder);
      (elementBuilder.getPresenter() as IElementPresenter).presentElement(
        elementTO,
        elementPositions.shift()!
      );
      elementBuilder.reset();
    });
  }

  private getElementPositions(elementCount: number): [Vector3, number][] {
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
    return [
      new Vector3(
        this.viewModel.doorWidth.Value / 2,
        this.viewModel.baseHeight.Value,
        -this.viewModel.spaceLength.Value - this.viewModel.wallThickness.Value
      ),
      -90,
    ];
  }
}
