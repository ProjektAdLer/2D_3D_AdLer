import { injectable } from "inversify";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../Ports/LMSPort/ILMSPort";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import LoginModalController from "./LoginModalController";
import LoginModalPresenter from "./LoginModalPresenter";
import LoginModalViewModel from "./LoginModalViewModel";

@injectable()
export default class LoginModalBuilder extends PresentationBuilder<
  LoginModalViewModel,
  LoginModalController,
  undefined,
  LoginModalPresenter
> {
  constructor() {
    super(
      LoginModalViewModel,
      LoginModalController,
      undefined,
      LoginModalPresenter
    );
  }

  override buildController(): void {
    super.buildController();

    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, LoginModalViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILMSPort>(
      PORT_TYPES.ILMSPort
    ).registerLoginModalPresenter(this.presenter!);
  }
}
