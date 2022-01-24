import { Container } from 'inversify';
import { PresentationLogic } from '../Presentation/API/PresentationLogic';
import { SBWViewModel } from '../Presentation/SchoenerBunterWuerfel/SBWViewModel';
import { BusinessLogic } from '../BusinessLogic/API/BusinessLogic';
import { Calculator } from '../BusinessLogic/Calculator';
import { DataAccess } from '../DataAccess/API/DataAccess';

var CoreDIContainer = new Container();
CoreDIContainer.bind<PresentationLogic>(PresentationLogic).toSelf();
CoreDIContainer.bind<SBWViewModel>(SBWViewModel).toSelf();
CoreDIContainer.bind<BusinessLogic>(BusinessLogic).toSelf();
CoreDIContainer.bind<Calculator>(Calculator).toSelf();
CoreDIContainer.bind<DataAccess>(DataAccess).toSelf();

export default CoreDIContainer;
