import { injectable } from "inversify";
import IDebugPanelPresenter from "../../Presentation/React/DebugPanel/IDebugPanelPresenter";
import IDebugPort from "./IDebugPort";

@injectable()
export default class DebugPort implements IDebugPort {
  setUserToken(userToken: string): void {
    if (!this.debugPanelPresenter) {
      throw new Error("DebugPanelPresenter is not registered");
    }

    // call the presenter to set the user token
  }
  private debugPanelPresenter: IDebugPanelPresenter;

  public registerDebugPanelPresenter(
    debugPanelPresenter: IDebugPanelPresenter
  ): void {
    if (this.debugPanelPresenter) {
      throw new Error(
        "DebugPort already has a debug panel presenter registered."
      );
    }
    this.debugPanelPresenter = debugPanelPresenter;
  }
}
