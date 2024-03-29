import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LoginComponentController from "./LoginComponentController";
import LoginComponentPresenter from "./LoginComponentPresenter";
import LoginComponentViewModel from "./LoginComponentViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILMSAdapter from "src/Components/Core/Application/Ports/LMSPort/ILMSAdapter";

@injectable()
export default class LoginComponentBuilder extends PresentationBuilder<
  LoginComponentViewModel,
  LoginComponentController,
  undefined,
  LoginComponentPresenter
> {
  constructor() {
    super(
      LoginComponentViewModel,
      LoginComponentController,
      undefined,
      LoginComponentPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILMSAdapter>>(
      PORT_TYPES.ILMSPort
    ).registerAdapter(this.presenter!);
  }
}
