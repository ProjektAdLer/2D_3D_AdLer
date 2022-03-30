import { injectable, inject } from "inversify";
import IEngineManager from "../EngineManager/IEngineManager";
import IBusinessLogic from "./IBusinessLogic";
import IPresentation from "./IPresentation";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import type IScenePresenter from "../SceneManagment/IScenePresenter";
import ICoreRenderer from "../CoreRenderer/ICoreRenderer";

@injectable()
export default class Presentation implements IPresentation {
  private businessLogic: IBusinessLogic;
  private engineManager: IEngineManager;
  private scenePresenter: IScenePresenter;

  private coreRenderer: ICoreRenderer;

  constructor(
    @inject(CORE_TYPES.IBusinessLogic) businessLogic: IBusinessLogic,
    @inject(CORE_TYPES.IEngineManager) engineManager: IEngineManager,
    @inject(CORE_TYPES.IScenePresenter) scenePresenter: IScenePresenter,
    @inject(CORE_TYPES.ICoreRenderer) coreRenderer: ICoreRenderer
  ) {
    this.businessLogic = businessLogic;
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

  get BusinessLogic(): IBusinessLogic {
    return this.businessLogic;
  }
}
