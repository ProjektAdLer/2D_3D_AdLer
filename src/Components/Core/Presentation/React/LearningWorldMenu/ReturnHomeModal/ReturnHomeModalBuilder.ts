import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ReturnHomeModalViewModel from "./ReturnHomeModalViewModel";
import IReturnHomeModalPresenter from "./IReturnHomeModalPresenter";
import ReturnHomeModalPresenter from "./ReturnHomeModalPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

@injectable()
export default class ReturnHomeModalBuilder extends PresentationBuilder<
  ReturnHomeModalViewModel,
  undefined,
  undefined,
  IReturnHomeModalPresenter
> {
  constructor() {
    super(
      ReturnHomeModalViewModel,
      undefined,
      undefined,
      ReturnHomeModalPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
