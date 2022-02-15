import { BusinessLogic } from "./../BusinessLogic/API/BusinessLogic";
import { Container } from "inversify";
import { PresentationLogic } from "../PresentationLogic/API/PresentationLogic";
import { DataAccess } from "../DataAccess/API/DataAccess";

// rename this container when using the template
var CoreDIContainer = new Container();

CoreDIContainer.bind<PresentationLogic>(PresentationLogic).toSelf();
CoreDIContainer.bind<BusinessLogic>(BusinessLogic).toSelf();
CoreDIContainer.bind<DataAccess>(DataAccess).toSelf();

export default CoreDIContainer;
