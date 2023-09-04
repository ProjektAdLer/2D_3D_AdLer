import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import AdaptivityElementViewModel from "./AdaptivityElementViewModel";
import IAdaptivityElementPresenter from "./IAdaptivityElementPresenter";
import AdaptivityElementPresenter from "./AdaptivityElementPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../../Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import IAdaptivityElementController from "./IAdaptivityElementController";
import AdaptivityElementController from "./AdaptivityElementController";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import CORE_TYPES from "~DependencyInjection/CoreTypes";

@injectable()
export default class AdaptivityElementBuilder extends PresentationBuilder<
  AdaptivityElementViewModel,
  IAdaptivityElementController,
  undefined,
  IAdaptivityElementPresenter
> {
  constructor() {
    super(
      AdaptivityElementViewModel,
      AdaptivityElementController,
      undefined,
      AdaptivityElementPresenter
    );
  }

  override buildViewModel(): void {
    super.buildViewModel();
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      AdaptivityElementViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
