import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import LoadLearningWorldButtonController from "./LoadLearningWorldButtonController";
import LoadLearningWorldButtonPresenter from "./LoadLearningWorldButtonPresenter";
import LoadLearningWorldButtonViewModel from "./LoadLearningWorldButtonViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.ILoadLearningWorldButtonBuilder).to(LoadLearningWorldButtonBuilder);
ILoadLearningWorldButtonBuilder: Symbol("ILoadLearningWorldButtonBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.ILoadLearningWorldButtonBuilder
);
director.build();
*/

@injectable()
export default class LoadLearningWorldButtonBuilder extends PresentationBuilder<
  LoadLearningWorldButtonViewModel,
  LoadLearningWorldButtonController,
  undefined,
  LoadLearningWorldButtonPresenter
> {
  constructor() {
    super(
      LoadLearningWorldButtonViewModel,
      LoadLearningWorldButtonController,
      undefined,
      LoadLearningWorldButtonPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      LoadLearningWorldButtonViewModel
    );
  }
}
