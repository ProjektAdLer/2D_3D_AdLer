import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ILearningWorldCompletionModalController from "./ILearningWorldCompletionModalController";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import SolutionIcon from "../../../../../../Assets/icons/14-1-world-completed/world-completed-icon-nobg.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function LearningWorldCompletionModal({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningWorldCompletionModalViewModel,
    ILearningWorldCompletionModalController
  >(BUILDER_TYPES.ILearningWorldCompletionModalBuilder);

  const [showModal] = useObservable(viewModel.showModal);

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      className={tailwindMerge(
        className,
        "flex flex-col items-center justify-center"
      )}
      title="Lernwelt abgeschlossen!"
      showModal={showModal && !viewModel.wasClosedOnce}
      onClose={() => {
        controller.CloseButtonClicked();
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {<img className="w-32 mb-4" src={SolutionIcon} alt=""></img>}
        <div className="w-96">
          <p className="m-4">
            Du hast alle Lernräume erfolgreich abgeschlossen und somit die
            Lernwelt bestanden, herzlichen Glückwunsch! <br />
            Bitte nehmen Sie sich einen Moment Zeit, um unseren
            Online-Fragebogen zur Evaluation der digitalen Lernumgebung
            auszufüllen. Hier geht's zum
          </p>
          <div className="flex justify-center">
            <a
              className="m-8 mt-4 text-2xl font-bold underline text-adlergreen"
              href="https://www.soscisurvey.de/softwareengineeringkempten/"
            >
              Fragebogen.
            </a>
          </div>
          <div className="flex justify-center m-2 font-bold">
            <p>Vielen Dank für Ihre Unterstützung!</p>
          </div>
        </div>
      </div>
    </StyledModal>
  );
}
