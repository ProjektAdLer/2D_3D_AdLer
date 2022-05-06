import React from "react";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../CustomHooks/usePrimitive";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import IEntityManager from "../../Domain/EntityManager/IEntityManager";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

export default function MenuBar() {
  const entityManager = useInjection<IEntityManager>(CORE_TYPES.IEntityManager);

  const loadWorldController = new LoadWorldController();

  const rootEntity = entityManager.getRootEntity();

  const [, setShowModal] = usePrimitive(rootEntity.Value.showModal);
  return (
    <StyledContainer className="top-0 left-0 flex flex-col justify-center">
      <StyledButton
        onClick={() => {
          setShowModal(true);
        }}
      >
        <img src="icons/h5p_icon.svg" className="w-10"></img>
      </StyledButton>
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
        }}
      >
        <div>Debug: Welt laden</div>
        <div className="w-100% flex justify-center">
          <img src="icons/video_icon_screen_button.svg" className="w-10"></img>
        </div>
      </StyledButton>
      <StyledButton>
        <img src="/icons/bild_icon.svg" className="w-10"></img>
      </StyledButton>

      <StyledButton>
        <img src="/icons/Zettel_darkblue_text-icon.svg" className="w-10"></img>
      </StyledButton>
    </StyledContainer>
  );
}
