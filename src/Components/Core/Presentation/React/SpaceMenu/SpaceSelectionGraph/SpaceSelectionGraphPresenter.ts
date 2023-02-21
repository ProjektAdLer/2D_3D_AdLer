import ISpaceSelectionGraphPresenter from "./ISpaceSelectionGraphPresenter";
import SpaceSelectionGraphViewModel from "./SpaceSelectionGraphViewModel";

export default class SpaceSelectionGraphPresenter
  implements ISpaceSelectionGraphPresenter
{
  constructor(private viewModel: SpaceSelectionGraphViewModel) {}
}
