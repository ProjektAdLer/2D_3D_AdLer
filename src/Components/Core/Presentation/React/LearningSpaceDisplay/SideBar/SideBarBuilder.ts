import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SideBarController from "./SideBarController";
import SideBarViewModel from "./SideBarViewModel";
import SideBarPresenter from "./SideBarPresenter";
import ISideBarController from "./ISideBarController";
import ISideBarPresenter from "./ISideBarPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

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

  buildViewModel(): void {
    super.buildViewModel();
  }

  buildController(): void {
    if (!this.viewModel) {
      throw new Error("ViewModel must be built before Controller");
    }
    this.controller = new SideBarController(this.viewModel);
  }

  buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
