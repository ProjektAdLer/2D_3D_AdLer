import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ModalManagerController from "./ModalManagerController";
import ModalManagerPresenter from "./ModalManagerPresenter";
import ModalManagerViewModel from "./ModalManagerViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../Ports/UIPort/IUIPort";

@injectable()
export default class ModalManagerBuilder extends PresentationBuilder<
  ModalManagerViewModel,
  ModalManagerController,
  undefined,
  ModalManagerPresenter
> {
  constructor() {
    super(
      ModalManagerViewModel,
      ModalManagerController,
      undefined,
      ModalManagerPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, ModalManagerViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).registerModalManager(
      this.presenter!
    );
  }
}
