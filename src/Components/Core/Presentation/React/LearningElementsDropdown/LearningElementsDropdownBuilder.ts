import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownPresenter from "./LearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import ILearningWorldPort from "../../../Application/LoadWorld/ILearningWorldPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementsDropdownBuilder).to(LearningElementsDropdownBuilder);
ILearningElementsDropdownBuilder: Symbol("ILearningElementsDropdownBuilder"),
*/

@injectable()
export default class LearningElementsDropdownBuilder extends PresentationBuilder<
  LearningElementsDropdownViewModel,
  LearningElementsDropdownController,
  undefined,
  LearningElementsDropdownPresenter
> {
  constructor() {
    super(
      LearningElementsDropdownViewModel,
      LearningElementsDropdownController,
      undefined,
      LearningElementsDropdownPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      LearningElementsDropdownViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).learningElementDropdownPresenter = this.presenter!;
  }
}
