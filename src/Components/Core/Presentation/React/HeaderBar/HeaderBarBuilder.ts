import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import HeaderBarController from "./HeaderBarController";
import HeaderBarPresenter from "./HeaderBarPresenter";
import HeaderBarViewModel from "./HeaderBarViewModel";

@injectable()
export default class HeaderBarBuilder extends PresentationBuilder<
  HeaderBarViewModel,
  HeaderBarController,
  undefined,
  HeaderBarPresenter
> {
  constructor() {
    super(
      HeaderBarViewModel,
      HeaderBarController,
      undefined,
      HeaderBarPresenter
    );
  }
}
