import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import ILearningElementModalPresenter from "./ILearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import bind from "bind-decorator";

export default class LearningElementModalPresenter
  implements ILearningElementModalPresenter
{
  constructor(private viewModel: LearningElementModalViewModel) {}

  onLearningElementLoaded(elementTO: LearningElementTO): void {
    this.viewModel.type.Value = elementTO.type;
    this.viewModel.id.Value = elementTO.id;
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.filePath.Value = elementTO.filePath ?? "";
    this.viewModel.isScoreable.Value = elementTO.isScoreable;
    this.viewModel.hasScored.Value = elementTO.hasScored;

    if (this.viewModel.isScoreable.Value) {
      this.viewModel.isVisible.Value = false;
      this.viewModel.isOpen.Value = true;
      setTimeout(() => {
        this.viewModel.isVisible.Value = true;
      }, this.viewModel.openDelay);
    } else {
      this.viewModel.isOpen.Value = true;
    }
  }

  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void {
    if (this.viewModel.id.Value === elementID) {
      this.viewModel.hasScored.Value = hasScored;
    }
  }

  @bind
  onSettingsUpdated(newSettings: SettingsTO): void {
    if (newSettings.cookieConsent !== undefined) {
      this.viewModel.cookieConsent.Value = newSettings.cookieConsent;
    }
  }
}
