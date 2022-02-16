import { injectable, inject } from "inversify";
import IEngineManager from "../EngineManager/IEngineManager";
import IBusinessLogic from "./IBusinessLogic";
import IPresentation from "./IPresentation";
import ScenePresenter from "../SceneManager/ScenePresenter";
import CORE_TYPES from "../../DependencyInjection/types";

@injectable()
export default class Presentation implements IPresentation {
  private businessLogic: IBusinessLogic;
  private engineManager: IEngineManager;
  private scenePresenter: ScenePresenter;

  constructor(
    @inject(CORE_TYPES.IBusinessLogic) businessLogic: IBusinessLogic,
    @inject(CORE_TYPES.IEngineManager) engineManager: IEngineManager,
    @inject(ScenePresenter) scenePresenter: ScenePresenter
  ) {
    console.log("Presentation");

    this.businessLogic = businessLogic;
    this.engineManager = engineManager;
    this.scenePresenter = scenePresenter;
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    this.engineManager.createEngine(canvas);
    await this.scenePresenter.createScene();
    this.scenePresenter.createRenderLoop();
  }

  get BusinessLogic(): IBusinessLogic {
    return this.businessLogic;
  }
}
