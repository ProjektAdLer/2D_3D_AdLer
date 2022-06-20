import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IMoodlePort from "../../../Ports/MoodlePort/IMoodlePort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();
  const moodleLoginPort = CoreDIContainer.get<IMoodlePort>(
    PORT_TYPES.IMoodlePort
  );

  return (
    <StyledContainer className="flex flex-col">
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
          // await loadWorldController.loadAvatar();
        }}
      >
        <img className="w-10" src="icons/debug-icon.svg"></img>
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
        <img className="w-10" src="icons/fullscreen-icon.svg"></img>
      </StyledButton>
      <StyledButton onClick={moodleLoginPort.displayLoginForm}>
        <img className="w-10" src="icons/user-icon.svg"></img>
      </StyledButton>
    </StyledContainer>
  );
}
