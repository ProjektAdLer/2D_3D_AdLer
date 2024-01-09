import { injectable } from "inversify";
import StoryNPCController from "./StoryNPCController";
import StoryNPCPresenter from "./StoryNPCPresenter";
import IStoryNPCController from "./IStoryNPCController";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel from "./StoryNPCViewModel";
import StoryNPCView from "./StoryNPCView";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";
import IStoryNPCBuilder from "./IStoryNPCBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class StoryNPCBuilder
  extends AsyncPresentationBuilder<
    StoryNPCViewModel,
    IStoryNPCController,
    StoryNPCView,
    IStoryNPCPresenter
  >
  implements IStoryNPCBuilder
{
  constructor() {
    super(
      StoryNPCViewModel,
      StoryNPCController,
      StoryNPCView,
      StoryNPCPresenter
    );
  }

  public modelType: LearningElementModel;

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.modelType = this.modelType;
  }

  override buildView(): void {
    super.buildView();
    this.view!.asyncSetupStoryNPC().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e)
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
