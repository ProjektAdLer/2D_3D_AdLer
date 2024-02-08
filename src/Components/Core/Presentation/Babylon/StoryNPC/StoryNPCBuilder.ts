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
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import LearningSpaceTemplateLookup from "src/Components/Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import { Vector3 } from "@babylonjs/core";

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
  public storyType: StoryElementType;
  public startInCutScene: boolean;
  public learningSpaceTemplateType: LearningSpaceTemplateType;

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.modelType = this.modelType;
    this.viewModel!.storyType = this.storyType;
    this.viewModel!.isInCutScene = this.startInCutScene;

    if (this.learningSpaceTemplateType !== LearningSpaceTemplateType.None) {
      const template = LearningSpaceTemplateLookup.getLearningSpaceTemplate(
        this.learningSpaceTemplateType
      );

      this.viewModel!.introIdlePosition = new Vector3(
        template.introStoryElementIdlePoint.position.x,
        0,
        template.introStoryElementIdlePoint.position.y
      );
      this.viewModel!.outroIdlePosition = new Vector3(
        template.outroStoryElementIdlePoint.position.x,
        0,
        template.outroStoryElementIdlePoint.position.y
      );
      this.viewModel!.avatarPosition = new Vector3(
        template.playerSpawnPoint.position.x,
        0,
        template.playerSpawnPoint.position.y
      );
    }
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
