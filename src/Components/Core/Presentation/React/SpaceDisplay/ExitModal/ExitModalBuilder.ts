import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ExitModalViewModel from "./ExitModalViewModel";
import ExitModalController from "./ExitModalController";
import ExitModalPresenter from "./ExitModalPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IUIPort from "src/Components/Core/Ports/UIPort/IUIPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class ExitModalBuilder extends PresentationBuilder<
  ExitModalViewModel,
  ExitModalController,
  undefined,
  ExitModalPresenter
> {
  constructor() {
    super(
      ExitModalViewModel,
      ExitModalController,
      undefined,
      ExitModalPresenter
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).registerExitModalPresenter(
      this.presenter!
    );
  }
}
