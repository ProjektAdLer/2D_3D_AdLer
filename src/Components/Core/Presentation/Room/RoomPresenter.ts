import { injectable, inject } from "inversify";
import IRoomPresenter from "./IRoomPresenter";
import Presentation from "../API/Presentation";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import RoomViewModel from "./RoomViewModel";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";
import IRoomView from "./IRoomView";
import type IScenePresenter from "../SceneManagment/IScenePresenter";
import { Vector3 } from "@babylonjs/core";

@injectable()
export default class RoomPresenter implements IRoomPresenter {
  private presentation: Presentation;
  private scenePresenter: IScenePresenter;
  private viewModel: RoomViewModel;
  private view: IRoomView;

  constructor(
    @inject(CORE_TYPES.IPresentation) presentation: Presentation,
    @inject(CORE_TYPES.IScenePresenter) scenePresenter: IScenePresenter,
    @inject(RoomViewModel) viewModel: RoomViewModel,
    @inject(CORE_TYPES.IRoomView) view: IRoomView
  ) {
    this.presentation = presentation;
    this.scenePresenter = scenePresenter;
    this.viewModel = viewModel;
    this.view = view;
    this.view.ViewModel = this.viewModel;

    this.viewModel.RoomSize = this.presentation.BusinessLogic.RoomSize;
  }

  getLearningElementPositions(elementCount: number): [Vector3[], number[]] {
    let positions: Vector3[] = [];
    let rotations: number[] = [];
    let sideOffset = -1;
    let bufferedLength = this.viewModel.RoomLength - 2;

    for (let i = 0; i < elementCount; i++) {
      positions.push(
        new Vector3(
          (bufferedLength / (elementCount - 1)) * i - bufferedLength / 2,
          this.viewModel.BaseHeight,
          (this.viewModel.RoomWidth / 2) * sideOffset
        )
      );
      rotations.push(-90 * sideOffset);
      sideOffset *= -1;
    }

    return [positions, rotations];
  }

  get RoomSize(): ROOMSIZE {
    return this.viewModel.RoomSize;
  }

  createFloor() {
    this.view.createFloor(this.scenePresenter.Scene);
  }

  createWalls() {
    this.view.createWalls(this.scenePresenter.Scene);
  }
}
