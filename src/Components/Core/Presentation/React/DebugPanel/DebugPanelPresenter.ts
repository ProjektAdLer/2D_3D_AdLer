import IDebugPanelPresenter from "./IDebugPanelPresenter";
import DebugPanelViewModel from "./DebugPanelViewModel";
import { logger } from "../../../../../Lib/Logger";

export default class DebugPanelPresenter implements IDebugPanelPresenter {
  constructor(private viewModel: DebugPanelViewModel) {}
  setMoodleToken(moodleToken: string): void {
    this.viewModel.moodleToken.Value = moodleToken;
  }

  setMisc(misc: { key: string; value: string }): void {
    // add to view model, if misc.key is not already in view model
    if (this.viewModel.misc.Value.findIndex((m) => m.key === misc.key) === -1) {
      this.viewModel.misc.Value.push(misc);
    } else {
      logger.warn(
        `DebugPanelPresenter.setMisc: misc.key ${misc.key} already exists in view model`
      );
    }
  }
}
