import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

import screenfull from "screenfull";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="top-0 left-0 flex flex-col justify-center">
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
          // await loadWorldController.loadAvatar();
        }}
      >
        <div style={{ color: "#ff0000" }}>Debug:</div>
        <div>Welt laden</div>
      </StyledButton>
      <StyledButton
        onClick={() => {
          if (screenfull.isEnabled) {
            screenfull.toggle();
          }
        }}
      >
        <div style={{ color: "#ff0000" }}>Debug:</div>
        <div>Toggle full screen mode</div>
      </StyledButton>
      <StyledButton
        onClick={() => {
          window.scrollTo(0, 1);
        }}
      >
        <div style={{ color: "#ff0000" }}>Debug:</div>
        <div>Hide Adress bar on Mobile</div>
      </StyledButton>
    </StyledContainer>
  );
}
