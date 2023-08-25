import { injectable } from "inversify";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningElementController from "./ILearningElementController";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementController from "./LearningElementController";
import LearningElementPresenter from "./LearningElementPresenter";
import LearningElementView from "./LearningElementView";
import LearningElementViewModel from "./LearningElementViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import { Vector3 } from "@babylonjs/core";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import ILearningElementBuilder from "./ILearningElementBuilder";

@injectable()
export default class LearningElementBuilder
  extends AsyncPresentationBuilder<
    LearningElementViewModel,
    ILearningElementController,
    LearningElementView,
    ILearningElementPresenter
  >
  implements ILearningElementBuilder
{
  elementData: LearningElementTO;
  elementPosition: [Vector3, number];

  constructor() {
    super(
      LearningElementViewModel,
      LearningElementController,
      LearningElementView,
      LearningElementPresenter
    );
  }

  override buildViewModel(): void {
    if (!this.elementData)
      throw new Error("LearningElementBuilder: elementData is undefined");
    if (!this.elementPosition)
      throw new Error("LearningElementBuilder: elementPosition is undefined");

    super.buildViewModel();

    this.viewModel!.id = this.elementData.id;
    this.viewModel!.position = this.elementPosition[0];
    this.viewModel!.rotation = this.elementPosition[1];
    this.viewModel!.name = this.elementData.name;
    this.viewModel!.type = this.elementData.type;
    this.viewModel!.description = this.elementData.description;
    this.viewModel!.goals = this.elementData.goals;
    this.viewModel!.value = this.elementData.value;
    this.viewModel!.modelType = this.elementData.model;
    this.viewModel!.theme = this.elementData.theme;

    this.viewModel!.hasScored.Value = this.elementData.hasScored;
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }

  override buildView(): void {
    super.buildView();

    this.view!.setupLearningElement().then(
      () => {
        this.resolveIsCompleted();
      },
      (e) => {
        console.log(e);
      }
    );
  }
}
