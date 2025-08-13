import ILevelUpModalController from "./ILevelUpModalController";
import LevelUpModalViewModel from "./LevelUpModalViewModel";

export default class LevelUpModalController implements ILevelUpModalController {
  constructor(private viewModel: LevelUpModalViewModel) {}

  close() {
    this.viewModel.isOpen.Value = false;
  }
}
