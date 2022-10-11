import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ElementsDropdownController from "./ElementsDropdownController";
import ElementsDropdownPresenter from "./ElementsDropdownPresenter";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementsDropdownBuilder).to(LearningElementsDropdownBuilder);
ILearningElementsDropdownBuilder: Symbol("ILearningElementsDropdownBuilder"),
*/

@injectable()
export default class ElementsDropdownBuilder extends PresentationBuilder<
  ElementsDropdownViewModel,
  ElementsDropdownController,
  undefined,
  ElementsDropdownPresenter
> {
  constructor() {
    super(
      ElementsDropdownViewModel,
      ElementsDropdownController,
      undefined,
      ElementsDropdownPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, ElementsDropdownViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ISpaceAdapter>>(
      PORT_TYPES.ISpacePort
    ).registerAdapter(this.presenter!);
  }
}
