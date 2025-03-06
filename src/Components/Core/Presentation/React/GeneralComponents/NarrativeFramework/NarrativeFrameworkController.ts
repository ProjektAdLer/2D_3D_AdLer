import INarrativeFrameworkController from "./INarrativeFrameworkController";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";

export default class NarrativeFrameworkController
  implements INarrativeFrameworkController
{
  constructor(private viewModel: NarrativeFrameworkViewModel) {}
  closeNarrativeFramework() {
    this.viewModel.isOpen.Value = false;
  }
}
