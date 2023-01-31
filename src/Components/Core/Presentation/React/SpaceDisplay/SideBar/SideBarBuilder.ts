import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SideBarController from "./SideBarController";
import SideBarViewModel from "./SideBarViewModel";

@injectable()
export default class SideBarBuilder extends PresentationBuilder<
  SideBarViewModel,
  SideBarController,
  undefined,
  undefined
> {
  constructor() {
    super(SideBarViewModel, SideBarController, undefined, undefined);
  }
}
