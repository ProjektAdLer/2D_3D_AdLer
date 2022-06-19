import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ErrorModalManagerController from "./ErrorModalManagerController";
import ErrorModalManagerPresenter from "./ErrorModalManagerPresenter";
import ErrorModalManagerViewModel from "./ErrorModalManagerViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import IErrorPort from "../../../Ports/ErrorPort/IErrorPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class ErrorModalManagerBuilder extends PresentationBuilder<
  ErrorModalManagerViewModel,
  ErrorModalManagerController,
  undefined,
  ErrorModalManagerPresenter
> {
  constructor() {
    super(
      ErrorModalManagerViewModel,
      ErrorModalManagerController,
      undefined,
      ErrorModalManagerPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      ErrorModalManagerViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IErrorPort>(
      PORT_TYPES.IErrorPort
    ).registerErrorModalManager(this.presenter!);
  }
}
