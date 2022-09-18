import { injectable } from "inversify";
import IElementPort from "src/Components/Core/Ports/ElementPort/IElementPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import ElementModalController from "./ElementModalController";
import ElementModalPresenter from "./ElementModalPresenter";
import ElementModalViewModel from "./ElementModalViewModel";

@injectable()
export default class ElementModalBuilder extends PresentationBuilder<
  ElementModalViewModel,
  ElementModalController,
  undefined,
  ElementModalPresenter
> {
  constructor();
  constructor() {
    super(
      ElementModalViewModel,
      ElementModalController,
      undefined,
      ElementModalPresenter
    );
  }

  override buildController(): void {
    super.buildController();

    // viewModel is for sure built when this is executed
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, ElementModalViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IElementPort>(
      PORT_TYPES.IElementPort
    ).registerModalPresenter(this.presenter!);
  }
}
