import { interfaces } from "inversify";
import IScenePresenter from "../../Presentation/Babylon/SceneManagement/IScenePresenter";
import AbstractSceneDefinition from "../../Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";

export type ScenePresenterFactory = interfaces.SimpleFactory<
  IScenePresenter,
  [interfaces.ServiceIdentifier<AbstractSceneDefinition>]
>;

const SCENE_TYPES = {
  IScenePresenter: Symbol("IScenePresenter"),
  ScenePresenterFactory: Symbol("IScenePresenterFactory"),
};

export default SCENE_TYPES;
