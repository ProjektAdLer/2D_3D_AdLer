import { injectable } from "inversify";
import PresentationBuilder from "../PresentationBuilder/AsyncPresentationBuilder";
import AdaptabilityElementViewModel from "./AdaptabilityElementViewModel";
import IAdaptabilityElementPresenter from "./IAdaptabilityElementPresenter";
import AdaptabilityElementPresenter from "./AdaptabilityElementPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import IAdaptabilityElementController from "./IAdaptabilityElementController";
import AdaptabilityElementController from "./AdaptabilityElementController";
import ViewModelControllerProvider from "../ViewModelProvider/ViewModelControllerProvider";
import CORE_TYPES from "~DependencyInjection/CoreTypes";

@injectable()
export default class AdaptabilityElementBuilder extends PresentationBuilder<
  AdaptabilityElementViewModel,
  IAdaptabilityElementController,
  undefined,
  IAdaptabilityElementPresenter
> {
  constructor() {
    super(
      AdaptabilityElementViewModel,
      AdaptabilityElementController,
      undefined,
      AdaptabilityElementPresenter
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
      AdaptabilityElementViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
