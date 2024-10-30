import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import WelcomePageButtonViewModel from "./WelcomePageButtonViewModel";
import WelcomePageButtonPresenter from "./WelcomePageButtonPresenter";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILMSAdapter from "src/Components/Core/Application/Ports/LMSPort/ILMSAdapter";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class WelcomePageButtonBuilder extends PresentationBuilder<
  WelcomePageButtonViewModel,
  undefined,
  undefined,
  WelcomePageButtonPresenter
> {
  constructor() {
    super(
      WelcomePageButtonViewModel,
      undefined,
      undefined,
      WelcomePageButtonPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILMSAdapter>>(
      PORT_TYPES.ILMSPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
