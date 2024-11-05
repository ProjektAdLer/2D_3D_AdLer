import { ContainerModule, interfaces } from "inversify";
import IScenePresenter from "../../Presentation/Babylon/SceneManagement/IScenePresenter";
import ScenePresenter from "../../Presentation/Babylon/SceneManagement/ScenePresenter";
import AbstractSceneDefinition from "../../Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import LearningSpaceSceneDefinition from "../../Presentation/Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";
import SCENE_TYPES from "./SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "~ReactComponents/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewSceneDefinition";

const ScenesDIContainer = new ContainerModule((bind) => {
  // ScenePresenter Factory
  bind<interfaces.Factory<IScenePresenter>>(
    SCENE_TYPES.ScenePresenterFactory,
  ).toFactory<
    IScenePresenter,
    [interfaces.ServiceIdentifier<AbstractSceneDefinition>]
  >((context: interfaces.Context) => {
    return (
      sceneDefinition: interfaces.ServiceIdentifier<AbstractSceneDefinition>,
    ) => {
      // return binding with given scene definition if it already exists
      if (
        context.container.isBoundNamed(
          SCENE_TYPES.IScenePresenter,
          sceneDefinition.toString(),
        )
      ) {
        return context.container.getNamed<IScenePresenter>(
          SCENE_TYPES.IScenePresenter,
          sceneDefinition.toString(),
        );
      }
      // otherwise create a new binding
      else {
        const scenePresenter = new ScenePresenter(
          context.container.get<AbstractSceneDefinition>(sceneDefinition),
        );
        context.container
          .bind<IScenePresenter>(SCENE_TYPES.IScenePresenter)
          .toConstantValue(scenePresenter)
          .whenTargetNamed(sceneDefinition.toString());

        return scenePresenter;
      }
    };
  });

  // Scenes
  bind<AbstractSceneDefinition>(LearningSpaceSceneDefinition).to(
    LearningSpaceSceneDefinition,
  );
  bind<AbstractSceneDefinition>(AvatarEditorPreviewSceneDefinition).to(
    AvatarEditorPreviewSceneDefinition,
  );
});

export default ScenesDIContainer;
