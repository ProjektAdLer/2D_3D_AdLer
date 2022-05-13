import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="top-0 left-0 flex flex-col justify-center">
      {/*       <StyledButton
        onClick={() => {
          alert(
            "Lernelemente werden jetzt über die 3D Elemente geöffnet.  Bitte zuerst die Welt laden"
          );
        }}
      >
        <img src="icons/h5p_icon.svg" className="w-10"></img>
      </StyledButton> */}

      {/*       <StyledButton
        onClick={() => {
          alert(
            "Lernelemente werden jetzt über die 3D Elemente geöffnet.  Bitte zuerst die Welt laden"
          );
        }}
      >
        <div className="w-100% flex justify-center">
          <img src="icons/video_icon_screen_button.svg" className="w-10"></img>
        </div>
      </StyledButton> */}

      {/*       <StyledButton
        onClick={() => {
          alert(
            "Lernelemente werden jetzt über die 3D Elemente geöffnet.  Bitte zuerst die Welt laden"
          );
        }}
      >
        <img src="/icons/bild_icon.svg" className="w-10"></img>
      </StyledButton> */}

      {/*       <StyledButton
        onClick={() => {
          alert(
            "Lernelemente werden jetzt über die 3D Elemente geöffnet.  Bitte zuerst die Welt laden"
          );
        }}
      >
        <img src="/icons/Zettel_darkblue_text-icon.svg" className="w-10"></img>
      </StyledButton> */}
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
        }}
      >
        <div>Debug:</div>
        <div>Welt laden</div>
      </StyledButton>
    </StyledContainer>
  );
}
