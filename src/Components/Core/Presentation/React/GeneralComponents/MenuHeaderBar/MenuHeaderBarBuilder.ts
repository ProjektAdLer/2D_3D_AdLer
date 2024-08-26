import { injectable } from "inversify";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import MenuHeaderBarController from "./MenuHeaderBarController";
import MenuHeaderBarPresenter from "./MenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";
import IMenuHeaderBarController from "./IMenuHeaderBarController";
import IMenuHeaderBarPresenter from "./IMenuHeaderBarPresenter";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

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

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
