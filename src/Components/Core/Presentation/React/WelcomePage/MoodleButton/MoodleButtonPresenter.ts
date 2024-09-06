import { config } from "src/config";
import IMoodleButtonPresenter from "./IMoodleButtonPresenter";
import MoodleButtonViewModel from "./MoodleButtonViewModel";

export default class MoodleButtonPresenter implements IMoodleButtonPresenter {
  constructor(private viewModel: MoodleButtonViewModel) {
    this.viewModel.moodleUrl = config.moodleURL;
  }
}
