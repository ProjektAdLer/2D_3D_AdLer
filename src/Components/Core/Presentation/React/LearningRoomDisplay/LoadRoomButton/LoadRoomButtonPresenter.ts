import ILoadRoomButtonPresenter from "./ILoadRoomButtonPresenter";
import LoadRoomButtonViewModel from "./LoadRoomButtonViewModel";

export default class LoadRoomButtonPresenter
  implements ILoadRoomButtonPresenter
{
  constructor(private viewModel: LoadRoomButtonViewModel) {}
}
