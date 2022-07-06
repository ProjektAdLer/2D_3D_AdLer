import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

import MoodleLoginButton from "../MoodleLoginButton/MoodleLoginButton";
import DebugPanel from "../DebugPanel/DebugPanel";

import debugIcon from "../../../../../Assets/icons/debug-icon.svg";
import fullscreenIcon from "../../../../../Assets/icons/fullscreen-icon.svg";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="flex flex-col ml-0">
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
          // await loadWorldController.loadAvatar();
        }}
      >
        <img className="w-6 lg:w-10" src={debugIcon}></img>
      </StyledButton>
      <StyledButton
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
            window.screen.orientation.unlock();
          } else {
            document.documentElement.requestFullscreen();
            window.screen.orientation.lock("landscape");
          }
        }}
      >
        <img className="w-6 lg:w-10" src={fullscreenIcon}></img>
      </StyledButton>
      <MoodleLoginButton />
      <DebugPanel />
    </StyledContainer>
  );
}
