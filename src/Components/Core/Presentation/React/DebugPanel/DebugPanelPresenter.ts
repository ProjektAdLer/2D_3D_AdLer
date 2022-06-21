import IDebugPanelPresenter from "./IDebugPanelPresenter";
import DebugPanelViewModel from "./DebugPanelViewModel";

export default class DebugPanelPresenter implements IDebugPanelPresenter {
  constructor(private viewModel: DebugPanelViewModel) {}
  setMoodleToken(moodleToken: string): void {
    this.viewModel.moodleToken.Value = moodleToken;
  }
}
