import IBusinessLogic from "../../Presentation/API/IBusinessLogic";
import DataAccess from "../../DataAccess/API/DataAccess";
import IDataAccess from "./IDataAccess";
import { inject, injectable } from "inversify";
import SceneManager from "../SceneManager";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;
  private sceneManager: SceneManager;

  constructor(
    @inject(DataAccess) dataAccess?: IDataAccess,
    @inject(SceneManager) sceneManager?: SceneManager
  ) {
    console.log("BusinessLogic");
    this.sceneManager = sceneManager!;
    if (dataAccess) {
      this.dataAccess = dataAccess;
    } else {
      this.dataAccess = new DataAccess();
    }
  }

  public CreateEngine = (canvas: HTMLCanvasElement): void => {
    this.sceneManager.babylonInit(canvas);
  };
}
