import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import WindowPresenter from "./WindowPresenter";
import WindowView from "./WindowView";
import WindowViewModel from "./WindowViewModel";
import IWindowPresenter from "./IWindowPresenter";

@injectable()
export default class WindowBuilder extends PresentationBuilder<
  WindowViewModel,
  undefined,
  WindowView,
  IWindowPresenter
> {
  constructor() {
    super(WindowViewModel, undefined, WindowView, WindowPresenter);
  }
}
