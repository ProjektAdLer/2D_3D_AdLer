import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import FullscreenSwitchController from "./FullscreenSwitchController";
import FullscreenSwitchPresenter from "./FullscreenSwitchPresenter";
import FullscreenSwitchViewModel from "./FullscreenSwitchViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.IFullscreenSwitchBuilder).to(FullscreenSwitchBuilder);
IFullscreenSwitchBuilder: Symbol("IFullscreenSwitchBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.IFullscreenSwitchBuilder
);
director.build();
*/

@injectable()
export default class FullscreenSwitchBuilder extends PresentationBuilder<
  FullscreenSwitchViewModel,
  FullscreenSwitchController,
  undefined,
  FullscreenSwitchPresenter
> {
  constructor() {
    super(
      FullscreenSwitchViewModel,
      FullscreenSwitchController,
      undefined,
      FullscreenSwitchPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, FullscreenSwitchViewModel);
  }
}
