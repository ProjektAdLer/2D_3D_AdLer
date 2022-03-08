import { injectable, inject } from "inversify";
import IRoomPresenter from "./IRoomPresenter";
import Presentation from "../API/Presentation";
import CORE_TYPES from "../../DependencyInjection/types";
import RoomViewModel from "./RoomViewModel";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";
import IRoomView from "./IRoomView";
import ScenePresenter from "../SceneManagment/ScenePresenter";
@injectable()
export default class RoomPresenter implements IRoomPresenter {
  private presentation: Presentation;
  private scenePresenter: ScenePresenter;
  private viewModel: RoomViewModel;
  private view: IRoomView;

  constructor(
    @inject(CORE_TYPES.IPresentation) presentation: Presentation,
    @inject(ScenePresenter) scenePresenter: ScenePresenter,
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

  // TODO: Create Method for future DTO to set RoomViewModel data

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
