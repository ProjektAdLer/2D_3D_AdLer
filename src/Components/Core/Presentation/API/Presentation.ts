import { injectable, inject } from "inversify";
import IEngineManager from "../EngineManager/IEngineManager";
import IPresentation from "./IPresentation";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import type IScenePresenter from "../SceneManagment/IScenePresenter";
import IReactEntry from "../ReactBaseComponents/IReactEntry";

@injectable()
export default class Presentation implements IPresentation {
  private engineManager: IEngineManager;
  private scenePresenter: IScenePresenter;

  private coreRenderer: IReactEntry;

  constructor(
    @inject(CORE_TYPES.IEngineManager) engineManager: IEngineManager,
    @inject(CORE_TYPES.IScenePresenter) scenePresenter: IScenePresenter,
    @inject(CORE_TYPES.ICoreRenderer) coreRenderer: IReactEntry
  ) {
    this.engineManager = engineManager;
    this.scenePresenter = scenePresenter;
    this.coreRenderer = coreRenderer;
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    this.engineManager.createEngine(canvas);

    await this.scenePresenter.createScene(
      CoreDIContainer.get(CORE_TYPES.ICreateSceneClass)
    );

    this.scenePresenter.createRenderLoop();
  }

  setupReact(): void {
    this.coreRenderer.setupReact();
  }
}
