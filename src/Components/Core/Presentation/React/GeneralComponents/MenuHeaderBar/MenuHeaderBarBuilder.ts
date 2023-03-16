import { injectable } from "inversify";
import IWorldPort from "src/Components/Core/Application/Ports/Interfaces/IWorldPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import MenuHeaderBarController from "./MenuHeaderBarController";
import MenuHeaderBarPresenter from "./MenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";
import IMenuHeaderBarController from "./IMenuHeaderBarController";
import IMenuHeaderBarPresenter from "./IMenuHeaderBarPresenter";

@injectable()
export default class MenuHeaderBarBuilder extends PresentationBuilder<
  MenuHeaderBarViewModel,
  IMenuHeaderBarController,
  undefined,
  IMenuHeaderBarPresenter
> {
  constructor() {
    super(
      MenuHeaderBarViewModel,
      MenuHeaderBarController,
      undefined,
      MenuHeaderBarPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
