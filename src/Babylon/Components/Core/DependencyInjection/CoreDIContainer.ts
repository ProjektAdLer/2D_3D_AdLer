import { BusinessLogic } from "./../BusinessLogic/API/BusinessLogic";
import { Container } from "inversify";
import { Presentation } from "../Presentation/API/Presentation";
import { DataAccess } from "../DataAccess/API/DataAccess";

// rename this container when using the template
var CoreDIContainer = new Container();

CoreDIContainer.bind<Presentation>(Presentation).toSelf();
CoreDIContainer.bind<BusinessLogic>(BusinessLogic).toSelf();
CoreDIContainer.bind<DataAccess>(DataAccess).toSelf();

export default CoreDIContainer;
