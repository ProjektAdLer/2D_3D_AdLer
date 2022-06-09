import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import {{name}}Controller from "./{{name}}Controller";
import {{name}}Presenter from "./{{name}}Presenter";
import {{name}}ViewModel from "./{{name}}ViewModel";

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

  // override buildController(): void {
  //   super.buildController();
  //   CoreDIContainer.get<ViewModelControllerProvider>(
  //     CORE_TYPES.IViewModelControllerProvider
  //   ).registerTupel(this.viewModel, this.controller, {{name}}ViewModel);
  // }

  // override buildPresenter(): void {
  //   super.buildPresenter();

  //   CoreDIContainer.get<IMoodlePort>(
  //     PORT_TYPES.IMoodlePort
  //   ).registerMoodleLoginPresenter(this.presenter!);
  // }
}
