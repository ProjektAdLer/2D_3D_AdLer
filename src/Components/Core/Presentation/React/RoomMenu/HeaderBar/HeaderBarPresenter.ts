import IHeaderBarPresenter from "./IHeaderBarPresenter";
import HeaderBarViewModel from "./HeaderBarViewModel";

export default class HeaderBarPresenter implements IHeaderBarPresenter {
  constructor(private viewModel: HeaderBarViewModel) {}

  displayWorldTitle(title: string): void {
    this.viewModel.title.Value = title;
  }
}
