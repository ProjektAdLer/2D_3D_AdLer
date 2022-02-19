import { Container } from "inversify";
import IPresentation from "../PresentationLogic/API/IPresentation";
import Presentation from "../PresentationLogic/API/Presentation";
import IBusinessLogic from "../PresentationLogic/API/IBusinessLogic";
import BusinessLogic from "../BusinessLogic/API/BusinessLogic";
import IDataAccess from "../BusinessLogic/API/IDataAccess";
import DataAccess from "../DataAccess/API/DataAccess";

import TYPES from "./types";

// rename this container when using the template
var DIContainer = new Container();

DIContainer.bind<IPresentation>(TYPES.IPresentation)
  .to(Presentation)
  .inSingletonScope();
DIContainer.bind<IBusinessLogic>(TYPES.IBusinessLogic)
  .to(BusinessLogic)
  .inSingletonScope();
DIContainer.bind<IDataAccess>(TYPES.IDataAccess)
  .to(DataAccess)
  .inSingletonScope();

export default DIContainer;
