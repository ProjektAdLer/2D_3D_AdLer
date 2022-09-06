import IHeaderBarPresenter from "./IHeaderBarPresenter";
import HeaderBarViewModel from "./HeaderBarViewModel";

export default class HeaderBarPresenter implements IHeaderBarPresenter {
  constructor(private viewModel: HeaderBarViewModel) {}
}
