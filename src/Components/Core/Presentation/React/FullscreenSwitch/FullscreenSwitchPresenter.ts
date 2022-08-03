import IFullscreenSwitchPresenter from "./IFullscreenSwitchPresenter";
import FullscreenSwitchViewModel from "./FullscreenSwitchViewModel";

export default class FullscreenSwitchPresenter
  implements IFullscreenSwitchPresenter
{
  constructor(private viewModel: FullscreenSwitchViewModel) {}
}
