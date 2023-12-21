import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SignInAndOutComponentController from "./SignInAndOutComponentController";
import SignInAndOutComponentPresenter from "./SignInAndOutComponentPresenter";
import SignInAndOutComponentViewModel from "./SignInAndOutComponentViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILMSAdapter from "src/Components/Core/Application/Ports/LMSPort/ILMSAdapter";

@injectable()
export default class SignInAndOutComponentBuilder extends PresentationBuilder<
  SignInAndOutComponentViewModel,
  SignInAndOutComponentController,
  undefined,
  SignInAndOutComponentPresenter
> {
  constructor() {
    super(
      SignInAndOutComponentViewModel,
      SignInAndOutComponentController,
      undefined,
      SignInAndOutComponentPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILMSAdapter>>(
      PORT_TYPES.ILMSPort
    ).registerAdapter(this.presenter!);
  }
}
