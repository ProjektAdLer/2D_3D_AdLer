import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SideBarController from "./SideBarController";
import SideBarViewModel from "./SideBarViewModel";
import SideBarPresenter from "./SideBarPresenter";
import ISideBarController from "./ISideBarController";
import ISideBarPresenter from "./ISideBarPresenter";

@injectable()
export default class SideBarBuilder extends PresentationBuilder<
  SideBarViewModel,
  ISideBarController,
  undefined,
  ISideBarPresenter
> {
  constructor() {
    super(SideBarViewModel, SideBarController, undefined, SideBarPresenter);
  }
}
