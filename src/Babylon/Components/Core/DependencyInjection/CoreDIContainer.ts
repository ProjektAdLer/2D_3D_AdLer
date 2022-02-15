import { IDataAccess } from "./../../SBWExample/BusinessLogic/API/IDataAccess";
import BusinessLogic from "./../BusinessLogic/API/BusinessLogic";
import { Container } from "inversify";
import Presentation from "../Presentation/API/Presentation";
import DataAccess from "../DataAccess/API/DataAccess";
import Core from "../API/Core";
import ICore from "../API/ICore";
import SceneManager from "../BusinessLogic/SceneManager";

var CoreDIContainer = new Container();

CoreDIContainer.bind<Presentation>(Presentation).toSelf().inSingletonScope();
CoreDIContainer.bind<BusinessLogic>(BusinessLogic).toSelf().inSingletonScope();
CoreDIContainer.bind<IDataAccess>(DataAccess).to(DataAccess).inSingletonScope();
CoreDIContainer.bind<Core>(Core).to(Core).inSingletonScope();
CoreDIContainer.bind<SceneManager>(SceneManager)
  .to(SceneManager)
  .inSingletonScope();

export default CoreDIContainer;
