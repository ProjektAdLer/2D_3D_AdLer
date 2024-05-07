import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownPresenter from "./LearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";

@injectable()
export default class LearningElementsDropdownBuilder extends PresentationBuilder<
  LearningElementsDropdownViewModel,
  LearningElementsDropdownController,
  undefined,
  LearningElementsDropdownPresenter
> {
  constructor() {
    super(
      LearningElementsDropdownViewModel,
      LearningElementsDropdownController,
      undefined,
      LearningElementsDropdownPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
