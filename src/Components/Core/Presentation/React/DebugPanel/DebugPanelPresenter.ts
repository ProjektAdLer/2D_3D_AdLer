import IDebugPanelPresenter from "./IDebugPanelPresenter";
import DebugPanelViewModel from "./DebugPanelViewModel";

export default class DebugPanelPresenter implements IDebugPanelPresenter {
  constructor(private viewModel: DebugPanelViewModel) {}
}
