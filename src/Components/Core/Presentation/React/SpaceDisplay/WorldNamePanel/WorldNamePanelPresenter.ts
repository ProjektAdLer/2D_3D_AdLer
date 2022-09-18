import IWorldNamePanelPresenter from "./IWorldNamePanelPresenter";
import WorldNamePanelViewModel from "./WorldNamePanelViewModel";

export default class WorldNamePanelPresenter
  implements IWorldNamePanelPresenter
{
  constructor(private viewModel: WorldNamePanelViewModel) {}
  displayWorldName(worldName: string) {
    this.viewModel.worldName.Value = worldName;
  }
}
