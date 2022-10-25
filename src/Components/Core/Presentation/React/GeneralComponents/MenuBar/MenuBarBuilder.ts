import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import MenuBarController from "./MenuBarController";
import MenuBarViewModel from "./MenuBarViewModel";

@injectable()
export default class MenuBarBuilder extends PresentationBuilder<
  MenuBarViewModel,
  MenuBarController,
  undefined,
  undefined
> {
  constructor() {
    super(MenuBarViewModel, MenuBarController, undefined, undefined);
  }
}
