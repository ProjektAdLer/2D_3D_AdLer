import { ILoadWorldPresenter } from "../Presentation/LoadWorldButton/ILoadWorldController";
import { ILoadWorld } from "./../Domain/LoadWorld/ILoadWorld";
let CORE_TYPES = {
  ICore: Symbol("ICore"),
  ICoreFactory: Symbol("ICoreFactory"),
  IDataAccess: Symbol("IDataAccess"),
  IEntityFactory: Symbol("IEntityFactory"),
  IBusinessLogic: Symbol("IBusinessLogic"),
  IPresentation: Symbol("IPresentation"),
  IEngineManager: Symbol("IEngineManager"),
  ISceneView: Symbol("ISceneView"),
  IScenePresenter: Symbol("IScenePresenter"),
  ICreateSceneClass: Symbol("ICreateSceneClass"),
  IRoomConfigurator: Symbol("IRoomConfigurator"),
  IRoomController: Symbol("IRoomController"),
  IRoomView: Symbol("IRoomView"),
  IMoodle: Symbol("IMoodle"),
  IMoodleDataAccess: Symbol("IMoodleDataAccess"),
  MoodleData: Symbol("MoodleData"),
  ILearingElementView: Symbol("ILearingElementView"),
  ILearingElementPresenter: Symbol("ILearingElementPresenter"),
  ILearningElementFactory: Symbol("ILearningElementFactory"),
  IEntityManager: Symbol("IEntityManager"),
  ICoreRenderer: Symbol("ICoreRenderer"),
  ILearningElementPanelPresenter: Symbol("ILearningElementPanelPresenter"),
  ILearningElementPanelViewModel: Symbol("ILearningElementPanelViewModel"),
  IViewModelProvider: Symbol("IViewModelProvider"),
  ILoadWorld: Symbol("ILoadWorld"),
  ILoadWorldController: Symbol("ILoadWorldController"),
};

export default CORE_TYPES;
