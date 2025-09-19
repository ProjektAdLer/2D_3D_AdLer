import ISettingContentPresenter from "./ISettingContentPresenter";
import SettingContentViewModel from "./SettingContentViewModel";

export default class SettingContentPresenter
  implements ISettingContentPresenter
{
  constructor(private viewModel: SettingContentViewModel) {}
}
