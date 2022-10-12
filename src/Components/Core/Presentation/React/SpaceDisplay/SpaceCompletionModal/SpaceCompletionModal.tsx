import { useState } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default function SpaceCompletionModal() {
  const [viewModel, controller] = useBuilder<
    SpaceCompletionModalViewModel,
    ISpaceCompletionModalController
  >(BUILDER_TYPES.ISpaceCompletionModalBuilder);

  const [showModal, setShowModal] = useState(true);

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      showModal={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div />
    </StyledModal>
  );
}
