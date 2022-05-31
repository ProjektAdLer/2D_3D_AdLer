import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="top-0 left-0 flex flex-col justify-center">
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
          await loadWorldController.loadAvatar();
        }}
      >
        <div>Debug:</div>
        <div>Welt laden</div>
      </StyledButton>
    </StyledContainer>
  );
}
