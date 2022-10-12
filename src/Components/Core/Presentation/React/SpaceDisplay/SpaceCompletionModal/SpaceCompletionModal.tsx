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
      className="justify-center"
      title="Sie haben gewonnen!"
      showModal={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Der große Gewinner-Screen</h1>
        <p className="w-1/2">
          Ja, sie haben es geschafft und das ist gut so! Es war ein langer Weg,
          umso schöner endlich angekommen zu sein. Wenn Sie noch nicht genug
          haben, klicken sie einfach auf den Button.
        </p>
        <StyledButton shape="freefloatleft">
          Ja, what soll hier schon stehen, ne?!?!
        </StyledButton>
        <img className="w-64" src={RubicsCube}></img>
      </div>
    </StyledModal>
  );
}
