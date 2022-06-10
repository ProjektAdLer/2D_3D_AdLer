import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import {{name}}Controller from "./{{name}}Controller";
import {{name}}Presenter from "./{{name}}Presenter";
import {{name}}ViewModel from "./{{name}}ViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.I{{name}}Builder).to({{name}}Builder);
I{{name}}Builder: Symbol("I{{name}}Builder"),
*/

@injectable()
export default class {{name}}Builder extends PresentationBuilder<
  {{name}}ViewModel,
  {{name}}Controller,
  undefined,
  {{name}}Presenter
> {
  constructor() {
    super(
      {{name}}ViewModel,
      {{name}}Controller,
      undefined,
      {{name}}Presenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, {{name}}ViewModel);
  }


}
