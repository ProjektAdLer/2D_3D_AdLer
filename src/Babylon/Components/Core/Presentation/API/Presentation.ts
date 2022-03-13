import { injectable, inject } from "inversify";
import IEngineManager from "../EngineManager/IEngineManager";
import IBusinessLogic from "./IBusinessLogic";
import IPresentation from "./IPresentation";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import type IScenePresenter from "../SceneManagment/IScenePresenter";

@injectable()
export default class Presentation implements IPresentation {
  private businessLogic: IBusinessLogic;
  private engineManager: IEngineManager;
  private scenePresenter: IScenePresenter;

  constructor(
    @inject(CORE_TYPES.IBusinessLogic) businessLogic: IBusinessLogic,
    @inject(CORE_TYPES.IEngineManager) engineManager: IEngineManager,
    @inject(CORE_TYPES.IScenePresenter) scenePresenter: IScenePresenter
  ) {
    this.businessLogic = businessLogic;
    this.engineManager = engineManager;
    this.scenePresenter = scenePresenter;
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    this.engineManager.createEngine(canvas);

    await this.scenePresenter.createScene(
      CoreDIContainer.get(CORE_TYPES.ICreateSceneClass)
    );

    this.scenePresenter.createRenderLoop();
  }

  get BusinessLogic(): IBusinessLogic {
    return this.businessLogic;
  }
}
