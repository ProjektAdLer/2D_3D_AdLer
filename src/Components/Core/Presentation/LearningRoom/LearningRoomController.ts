import { injectable, inject } from "inversify";
import IRoomController from "./ILearningRoomController";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import RoomViewModel from "./LearningRoomViewModel";
import IRoomView from "./ILearningRoomView";
import type ISceneController from "../SceneManagment/ISceneController";

@injectable()
export default class LearningRoomController implements IRoomController {
  private viewModel: RoomViewModel;
  private view: IRoomView;

  constructor(
    @inject(CORE_TYPES.ISceneController) sceneController: ISceneController,
    @inject(RoomViewModel) viewModel: RoomViewModel,
    @inject(CORE_TYPES.ILearningRoomView) view: IRoomView
  ) {
    this.viewModel = viewModel;
    this.view = view;
    this.view.ViewModel = this.viewModel;

    viewModel.scene.Value = sceneController.Scene;
  }
}
