import ILoadSpaceButtonPresenter from "./ILoadSpaceButtonPresenter";
import LoadSpaceButtonViewModel from "./LoadSpaceButtonViewModel";

export default class LoadSpaceButtonPresenter
  implements ILoadSpaceButtonPresenter
{
  constructor(private viewModel: LoadSpaceButtonViewModel) {}
}
