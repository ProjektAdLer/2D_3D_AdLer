import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";
import RubicsCube from "../../../../../../Assets/icons/17-solutionRubicsCube/rubicscube-check-solution-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function SpaceCompletionModal() {
  const [viewModel, controller] = useBuilder<
    SpaceCompletionModalViewModel,
    ISpaceCompletionModalController
  >(BUILDER_TYPES.ISpaceCompletionModalBuilder);
  const [showModal] = useObservable(viewModel.showModal);
  const [score] = useObservable<number>(viewModel.score);
  const [requiredScore] = useObservable<number>(viewModel.requiredScore);

  if (!viewModel || !controller || !showModal) return null;

  return (
    <StyledModal
      className="flex flex-col items-center justify-center"
      title="Raum abgeschlossen!"
      showModal={showModal && !viewModel.wasClosedOnce}
      onClose={() => {
        controller.CloseButtonClicked();
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {
          <img
            className="w-20 mb-4 lg:w-32"
            src={RubicsCube}
            alt="Lösung-Icon"
          ></img>
        }
        <div className="p-4 mb-4 w-96">
          <p className="p-1 text-sm lg:text:xl">
            Du hast {score} von {requiredScore} erforderlichen Punkten erreicht!{" "}
          </p>

          <p className="p-1 text-sm lg:text:xl">
            Schließe dieses Fenster, um den Lernraum weiter zu erkunden. Klicke
            den unteren Button, um einen anderen Lernraum aus dem Menü zu
            wählen.
          </p>
        </div>

        <StyledButton
          className="mb-4"
          shape="freefloatleft"
          onClick={() => controller.ReturnWorldMenuButtonClicked()}
        >
          Zurück zum Lernraum-Menü
        </StyledButton>
      </div>
    </StyledModal>
  );
}
