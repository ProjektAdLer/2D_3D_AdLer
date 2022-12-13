import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LoginButtonController from "./LoginButtonController";
import LoginButtonPresenter from "./LoginButtonPresenter";
import LoginButtonViewModel from "./LoginButtonViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import ILMSPort from "../../../../Ports/LMSPort/ILMSPort";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class LoginButtonBuilder extends PresentationBuilder<
  LoginButtonViewModel,
  LoginButtonController,
  undefined,
  LoginButtonPresenter
> {
  constructor() {
    super(
      LoginButtonViewModel,
      LoginButtonController,
      undefined,
      LoginButtonPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, LoginButtonViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILMSPort>(
      PORT_TYPES.ILMSPort
    ).registerLoginButtonPresenter(this.presenter!);
  }
}
