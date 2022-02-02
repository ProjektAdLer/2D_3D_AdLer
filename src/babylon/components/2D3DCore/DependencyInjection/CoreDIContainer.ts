import { Container } from 'inversify';
import { PresentationLogic } from '../Presentation/API/PresentationLogic';
import { SBWViewModel } from '../Presentation/SchoenerBunterWuerfel/SBWViewModel';
import { SBWView } from '../View/SBWView';
import { BusinessLogic } from '../BusinessLogic/API/BusinessLogic';
import { Calculator } from '../BusinessLogic/Calculator';
import { DataAccess } from '../DataAccess/API/DataAccess';
import { ISBWView } from '../Presentation/SchoenerBunterWuerfel/ISBWView';

import TYPES from './types';

var CoreDIContainer = new Container();

CoreDIContainer.bind<SBWViewModel>(SBWViewModel).toSelf();
CoreDIContainer.bind<ISBWView>(TYPES.ISBWView).to(SBWView);

CoreDIContainer.bind<PresentationLogic>(PresentationLogic).toSelf();
CoreDIContainer.bind<BusinessLogic>(BusinessLogic).toSelf();
CoreDIContainer.bind<DataAccess>(DataAccess).toSelf();

CoreDIContainer.bind<Calculator>(Calculator).toSelf();

export default CoreDIContainer;
