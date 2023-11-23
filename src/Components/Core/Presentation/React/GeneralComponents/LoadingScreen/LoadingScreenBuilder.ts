import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import LoadingScreenPresenter from "./LoadingScreenPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILoadingScreenPresenter from "./ILoadingScreenPresenter";
import ILoadingScreenController from "./ILoadingScreenController";
import LoadingScreenController from "./LoadingScreenController";

@injectable()
export default class LoadingScreenBuilder extends PresentationBuilder<
  LoadingScreenViewModel,
  ILoadingScreenController,
  undefined,
  ILoadingScreenPresenter
> {
  constructor() {
    super(
      LoadingScreenViewModel,
      LoadingScreenController,
      undefined,
      LoadingScreenPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (CoreDIContainer.isBound(PRESENTATION_TYPES.ILoadingScreenPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.ILoadingScreenPresenter);
    }

    CoreDIContainer.bind<ILoadingScreenPresenter>(
      PRESENTATION_TYPES.ILoadingScreenPresenter
    ).toConstantValue(this.presenter!);
  }
  override buildViewModel(): void {
    super.buildViewModel();
  }
  override buildController(): void {
    super.buildController();
  }
}
