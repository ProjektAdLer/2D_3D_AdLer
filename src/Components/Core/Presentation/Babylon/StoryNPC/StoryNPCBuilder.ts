import { injectable } from "inversify";
import StoryNPCController from "./StoryNPCController";
import StoryNPCPresenter from "./StoryNPCPresenter";
import IStoryNPCController from "./IStoryNPCController";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel, { StoryNPCState } from "./StoryNPCViewModel";
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
import IScenePresenter from "../SceneManagement/IScenePresenter";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IAvatarFocusSelection from "../Avatar/AvatarFocusSelection/IAvatarFokusSelection";

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
  public modelType: LearningElementModel;
  public storyType: StoryElementType;
  public noLearningElementHasScored: boolean = false;
  public learningSpaceCompleted: boolean = false;
  public learningSpaceTemplateType: LearningSpaceTemplateType;

  private scenePresenter: IScenePresenter;

  constructor() {
    super(
      StoryNPCViewModel,
      StoryNPCController,
      StoryNPCView,
      StoryNPCPresenter,
    );

    const scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  override buildViewModel(): void {
    super.buildViewModel();

    this.viewModel!.modelType = this.modelType;
    this.viewModel!.storyType = this.storyType;

    // set inital state
    // cut scene state is only set by the presenter for timing reasons
    if (this.storyType === StoryElementType.IntroOutro)
      this.viewModel!.state.Value = this.noLearningElementHasScored
        ? StoryNPCState.WaitOnCutSceneTrigger
        : StoryNPCState.RandomMovement;
    else if (this.storyType === StoryElementType.Intro) {
      if (this.noLearningElementHasScored)
        this.viewModel!.state.Value = StoryNPCState.WaitOnCutSceneTrigger;
      else if (this.learningSpaceCompleted)
        this.viewModel!.state.Value = StoryNPCState.Idle;
      else this.viewModel!.state.Value = StoryNPCState.RandomMovement;
    } else if (this.storyType === StoryElementType.Outro)
      this.viewModel!.state.Value = this.learningSpaceCompleted
        ? StoryNPCState.RandomMovement
        : StoryNPCState.Idle;

    if (this.learningSpaceTemplateType !== LearningSpaceTemplateType.None) {
      const template = LearningSpaceTemplateLookup.getLearningSpaceTemplate(
        this.learningSpaceTemplateType,
      );

      this.viewModel!.introIdlePosition = new Vector3(
        template.introStoryElementIdlePoint.position.x,
        0,
        template.introStoryElementIdlePoint.position.y,
      );
      this.viewModel!.introIdlePosRotation =
        template.introStoryElementIdlePoint.orientation.rotation;

      this.viewModel!.introCutsceneSpawnPosition = new Vector3(
        template.introCutsceneSpawnPoint.position.x,
        0,
        template.introCutsceneSpawnPoint.position.y,
      );
      this.viewModel!.introCutsceneRotation =
        template.introCutsceneSpawnPoint.orientation.rotation;

      this.viewModel!.outroIdlePosition = new Vector3(
        template.outroStoryElementIdlePoint.position.x,
        0,
        template.outroStoryElementIdlePoint.position.y,
      );
      this.viewModel!.outroIdlePosRotation =
        template.outroStoryElementIdlePoint.orientation.rotation;
    }
  }

  override buildView(): void {
    super.buildView();
    this.view!.asyncSetupStoryNPC().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e),
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IStoryNPCPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IStoryNPCPresenter);
    }

    CoreDIContainer.bind<IStoryNPCPresenter>(
      PRESENTATION_TYPES.IStoryNPCPresenter,
    ).toConstantValue(this.presenter!);

    const learningWorldPort = CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    );
    learningWorldPort.registerAdapter(
      this.presenter!,
      LocationScope._sceneRendering,
    );
    this.scenePresenter.addDisposeSceneCallback(() => {
      learningWorldPort.unregisterAdapter(this.presenter!);
    });

    CoreDIContainer.get<IAvatarFocusSelection>(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    ).registerFocusable(this.presenter!);
  }
}
