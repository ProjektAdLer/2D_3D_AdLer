import { injectable, inject } from "inversify";
import IRoomController from "./IRoomController";
import Presentation from "../API/Presentation";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import RoomViewModel from "./RoomViewModel";
import IRoomView from "./IRoomView";
import type ISceneController from "../SceneManagment/ISceneController";

@injectable()
export default class RoomController implements IRoomController {
  private presentation: Presentation;
  private viewModel: RoomViewModel;
  private view: IRoomView;

  constructor(
    @inject(CORE_TYPES.IPresentation) presentation: Presentation,
    @inject(CORE_TYPES.ISceneController) sceneController: ISceneController,
    @inject(RoomViewModel) viewModel: RoomViewModel,
    @inject(CORE_TYPES.IRoomView) view: IRoomView
  ) {
    this.presentation = presentation;
    this.viewModel = viewModel;
    this.view = view;
    this.view.ViewModel = this.viewModel;

    viewModel.scene.Value = sceneController.Scene;
  }
}
