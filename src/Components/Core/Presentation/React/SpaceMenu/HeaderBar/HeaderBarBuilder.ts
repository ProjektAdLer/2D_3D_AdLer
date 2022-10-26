import { injectable } from "inversify";
import IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import HeaderBarController from "./HeaderBarController";
import HeaderBarPresenter from "./HeaderBarPresenter";
import HeaderBarViewModel from "./HeaderBarViewModel";
import IHeaderBarController from "./IHeaderBarController";
import IHeaderBarPresenter from "./IHeaderBarPresenter";

@injectable()
export default class HeaderBarBuilder extends PresentationBuilder<
  HeaderBarViewModel,
  IHeaderBarController,
  undefined,
  IHeaderBarPresenter
> {
  constructor() {
    super(
      HeaderBarViewModel,
      HeaderBarController,
      undefined,
      HeaderBarPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
