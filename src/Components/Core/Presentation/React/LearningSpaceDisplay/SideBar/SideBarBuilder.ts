import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SideBarController from "./SideBarController";
import SideBarViewModel from "./SideBarViewModel";
import SideBarPresenter from "./SideBarPresenter";
import ISideBarController from "./ISideBarController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
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

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
