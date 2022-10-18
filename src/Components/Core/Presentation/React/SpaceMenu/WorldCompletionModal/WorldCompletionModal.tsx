import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import IWorldCompletionModalController from "./IWorldCompletionModalController";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";
import SolutionIcon from "../../../../../../Assets/icons/14-1_world-completed/world-completed-icon-nobg.svg";

export default function WorldCompletionModal() {
  const [viewModel, controller] = useBuilder<
    WorldCompletionModalViewModel,
    IWorldCompletionModalController
  >(BUILDER_TYPES.IWorldCompletionModalBuilder);

  const [showModal] = useObservable(viewModel.showModal);

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      className="flex flex-col justify-center items-center"
      title="Lernwelt abgeschlossen!"
      showModal={showModal}
      onClose={() => {
        controller.CloseButtonClicked();
      }}
    >
      <div className="flex flex-col justify-center items-center">
        {<img className="w-32 mb-4" src={SolutionIcon} alt=""></img>}
        <div className="w-96">
          <p className="mb-4">
            Du hast alle Lernräume erfolgreich abgeschlossen und somit die
            Lernwelt bestanden, herzlichen Glückwunsch!
          </p>
        </div>
      </div>
    </StyledModal>
  );
}
