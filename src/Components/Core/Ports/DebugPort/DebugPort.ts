import bind from "bind-decorator";
import { injectable } from "inversify";
import type IDebugPanelPresenter from "../../Presentation/React/DebugPanel/IDebugPanelPresenter";
import IDebugPort from "./IDebugPort";

@injectable()
export default class DebugPort implements IDebugPort {
  addToMisc(key: string, value: string): void {
    if (!this.debugPanelPresenter) {
      throw new Error("DebugPanelPresenter is not registered");
    }

    this.debugPanelPresenter.setMisc({ key, value });
  }
  private debugPanelPresenter: IDebugPanelPresenter;
  @bind
  setUserToken(userToken: string): void {
    if (!this.debugPanelPresenter) {
      throw new Error("DebugPanelPresenter is not registered");
    }

    this.debugPanelPresenter.setMoodleToken(userToken);
  }

  @bind
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
