import { injectable, inject } from "inversify";
import IRoomPresenter from "./IRoomPresenter";
import Presentation from "../API/Presentation";
import CORE_TYPES from "../../DependencyInjection/types";
import RoomViewModel from "./RoomViewModel";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";
import IRoomView from "./IRoomView";
import ScenePresenter from "../SceneManagment/ScenePresenter";
import RoomView from "./RoomView";

@injectable()
export default class RoomPresenter implements IRoomPresenter {
  private presentation: Presentation;
  private scenePresenter: ScenePresenter;
  private viewModel: RoomViewModel;
  private view: IRoomView;

  constructor(
    @inject(CORE_TYPES.IPresentation) presentation: Presentation,
    @inject(ScenePresenter) scenePresenter: ScenePresenter,
    @inject(RoomViewModel) viewModel: RoomViewModel
  ) {
    this.presentation = presentation;
    this.scenePresenter = scenePresenter;
    this.viewModel = viewModel;
    this.view = new RoomView(viewModel);

    this.viewModel.RoomSize = this.presentation.BusinessLogic.RoomSize;
    this.viewModel.RoomScale = this.calculateRoomScale(viewModel.RoomSize);
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

  private calculateRoomScale(roomSize: ROOMSIZE): number {
    if (roomSize === ROOMSIZE.Small) return 1;
    else if (roomSize === ROOMSIZE.Medium) return 2;
    else if (roomSize === ROOMSIZE.Large) return 3;
    else throw new Error("Invalid roomSize to scale Room!");
  }
}
