import IWorldDetailPresenter from "./IWorldDetailPresenter";
import WorldDetailViewModel, {
  WorldDetailWorldData,
} from "./WorldDetailViewModel";

export default class WorldDetailPresenter implements IWorldDetailPresenter {
  constructor(private viewModel: WorldDetailViewModel) {}
}
