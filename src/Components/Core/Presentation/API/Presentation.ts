import { injectable, inject } from "inversify";
import IEngineManager from "../EngineManager/IEngineManager";
import IPresentation from "./IPresentation";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import IReactEntry from "../ReactEntryPoint/IReactEntry";
import type ISceneController from "../SceneManagment/ISceneController";

@injectable()
export default class Presentation implements IPresentation {
  private engineManager: IEngineManager;
  private sceneController: ISceneController;
  private coreRenderer: IReactEntry;

  constructor(
    @inject(CORE_TYPES.IEngineManager) engineManager: IEngineManager,
    @inject(CORE_TYPES.ISceneController) sceneController: ISceneController,
    @inject(CORE_TYPES.ICoreRenderer) coreRenderer: IReactEntry
  ) {
    this.engineManager = engineManager;
    this.sceneController = sceneController;
    this.coreRenderer = coreRenderer;
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    this.engineManager.createEngine(canvas);

    await this.sceneController.createScene(
      CoreDIContainer.get(CORE_TYPES.ICreateSceneClass)
    );

    this.sceneController.createRenderLoop();
  }

  setupReact(): void {
    this.coreRenderer.setupReact();
  }
}
