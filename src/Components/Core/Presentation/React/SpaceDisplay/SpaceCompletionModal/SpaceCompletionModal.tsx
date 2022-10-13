import { useState } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";
import RubicsCube from "../../../../../../Assets/icons/17-solution/rubicscube-check-solution-icon-nobg.svg";

export default function SpaceCompletionModal() {
  const [viewModel, controller] = useBuilder<
    SpaceCompletionModalViewModel,
    ISpaceCompletionModalController
  >(BUILDER_TYPES.ISpaceCompletionModalBuilder);

  const [showModal, setShowModal] = useState(true);

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      className="flex flex-col justify-center items-center"
      title="Raum abgeschlossen!"
      showModal={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div className="flex flex-col justify-center items-center">
        {<img className="w-32 mb-4" src={RubicsCube} alt=""></img>}
        <div className="w-96">
          <p className="mb-4">
            Du hast die erforderlichen Punkte erreicht und den Lernraum
            erfolgreich abgeschlossen. Schließe das Fenster, um den Lenrraum
            weiter zu erkunden oder klicke den unteren Button um einen anderen
            Lernraum aus dem Menü zu wählen.
          </p>
        </div>

        <StyledButton className="mb-4" shape="freefloatleft">
          Zurück zum Lernraum-Menü
        </StyledButton>
      </div>
    </StyledModal>
  );
}
