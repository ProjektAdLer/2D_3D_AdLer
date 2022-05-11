import { Vector3 } from "@babylonjs/core";
import { injectable } from "inversify";
import { LearningRoomTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import LearningElementBuilder from "../../PresentationBuilder/LearningElementBuilder";
import ILearningRoomPort from "./ILearningRoomPort";
import LearningRoomViewModel from "./LearningRoomViewModel";

@injectable()
export default class LearningRoomPresenter implements ILearningRoomPort {
  private viewModel: LearningRoomViewModel;

  public set ViewModel(viewModel: LearningRoomViewModel) {
    this.viewModel = viewModel;
  }

  presentLearningRoom(learningRoomTO: LearningRoomTO): void {
    if (!this.viewModel) {
      throw new Error("ViewModel not set");
    }

    // set view model data
    this.viewModel.id = learningRoomTO.id;
    this.setRoomDimensions(learningRoomTO);

    // create learning elements
    let director = CoreDIContainer.get<IPresentationDirector>(
      CORE_TYPES.IPresentationDirector
    );
    let builder = CoreDIContainer.get<IPresentationBuilder>(
      CORE_TYPES.ILearningElementBuilder
    );
    director.Builder = builder;

    let elementPositions = this.getLearningElementPositions(
      learningRoomTO.learningElements.length
    );

    learningRoomTO.learningElements.forEach((elementTO) => {
      director.build();
      let presenter = builder.getPresenter();
      presenter.presentLearningElement(elementTO, elementPositions.shift()!);
    });
  }

  private setRoomDimensions(learningRoomTO: LearningRoomTO): void {
    this.viewModel.roomLength.Value =
      (learningRoomTO.learningElements.length / 2) * 4;
    this.viewModel.roomWidth.Value =
      learningRoomTO.learningElements.length > 1 ? 10 : 6;
  }

  private getLearningElementPositions(
    elementCount: number
  ): [Vector3, number][] {
    let positions: [Vector3, number][] = [];
    let sideOffset = -1;

    for (let i = 0; i < elementCount; i++) {
      positions.push([
        new Vector3(
          (this.viewModel.roomWidth.Value / 2) * sideOffset,
          this.viewModel.baseHeight.Value,
          (this.viewModel.roomLength.Value / (elementCount + 1)) * (i + 1) -
            this.viewModel.roomLength.Value / 2
        ),
        sideOffset === 1 ? 0 : 180,
      ]);
      sideOffset *= -1;
    }
    return positions;
  }
}
