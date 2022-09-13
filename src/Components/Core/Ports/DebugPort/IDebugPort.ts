import IDebugPanelPresenter from "../../Presentation/React/LearningRoomDisplay/DebugPanel/IDebugPanelPresenter";

export default interface IDebugPort {
  registerDebugPanelPresenter(debugPanelPresenter: IDebugPanelPresenter): void;
  setUserToken(userToken: string): void;
  addToMisc(key: string, value: string): void;
}
