import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="flex flex-col">
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
          // await loadWorldController.loadAvatar();
        }}
      >
        <div className="text-red-700">Debug:</div>
        <div>Welt laden</div>
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
        <div className="text-red-700">Debug:</div>
        <div>
          Toggle full<br></br>screen mode
        </div>
      </StyledButton>
    </StyledContainer>
  );
}
