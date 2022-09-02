import bind from "bind-decorator";
import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import type IDebugPanelPresenter from "../../Presentation/React/DebugPanel/IDebugPanelPresenter";
import IDebugPort from "./IDebugPort";

@injectable()
export default class DebugPort implements IDebugPort {
  private debugPanelPresenter: IDebugPanelPresenter;

  addToMisc(key: string, value: string): void {
    if (!this.debugPanelPresenter) {
      throw new Error("DebugPanelPresenter is not registered");
    }

    this.debugPanelPresenter.setMisc({ key, value });
  }

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
      logger.warn("DebugPanelPresenter is already registered.");
    }
    this.debugPanelPresenter = debugPanelPresenter;
  }
}
