import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import DebugPanelController from "./DebugPanelController";
import DebugPanelPresenter from "./DebugPanelPresenter";
import DebugPanelViewModel from "./DebugPanelViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import IDebugPort from "../../../Ports/DebugPort/IDebugPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.IDebugPanelBuilder).to(DebugPanelBuilder);
IDebugPanelBuilder: Symbol("IDebugPanelBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.IDebugPanelBuilder
);
director.build();
*/

@injectable()
export default class DebugPanelBuilder extends PresentationBuilder<
  DebugPanelViewModel,
  DebugPanelController,
  undefined,
  DebugPanelPresenter
> {
  constructor() {
    super(
      DebugPanelViewModel,
      DebugPanelController,
      undefined,
      DebugPanelPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, DebugPanelViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IDebugPort>(
      PORT_TYPES.IDebugPort
    ).registerDebugPanelPresenter(this.presenter!);
  }
}
