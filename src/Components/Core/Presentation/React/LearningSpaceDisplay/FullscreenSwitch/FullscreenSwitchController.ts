import IFullscreenSwitchController from "./IFullscreenSwitchController";

export default class FullscreenSwitchController
  implements IFullscreenSwitchController
{
  toggleFullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      window.screen.orientation.unlock();
    } else {
      document.documentElement.requestFullscreen();
      window.screen.orientation.lock("landscape");
    }
  }
}
