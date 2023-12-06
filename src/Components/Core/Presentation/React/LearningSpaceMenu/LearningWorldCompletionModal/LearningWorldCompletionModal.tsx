import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ILearningWorldCompletionModalController from "./ILearningWorldCompletionModalController";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import SolutionIcon from "../../../../../../Assets/icons/14-1-world-completed/world-completed-icon-nobg.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

export default function LearningWorldCompletionModal({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningWorldCompletionModalViewModel,
    ILearningWorldCompletionModalController
  >(BUILDER_TYPES.ILearningWorldCompletionModalBuilder);

  const [showModal] = useObservable(viewModel.showModal);
  const [evaluationLink] = useObservable(viewModel.evaluationLink);

  const { t } = useTranslation("spaceMenu");

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      className={tailwindMerge(
        className,
        "flex flex-col items-center justify-center"
      )}
      title={t("learningWorldCompleted").toString()}
      showModal={showModal && !viewModel.wasClosedOnce}
      onClose={() => {
        controller.CloseButtonClicked();
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {<img className="w-32 mb-4" src={SolutionIcon} alt=""></img>}
        <div className="w-96">
          <p className="mb-4">{t("congratulation")}</p>
          {evaluationLink && (
            <div>
              <div className="flex justify-center">
                <a
                  className="m-8 mt-2 text-2xl font-bold underline text-adlergreen"
                  href={evaluationLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("survey")}
                </a>
              </div>
              <div className="flex justify-center m-2 font-bold">
                <p>{t("thanks")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledModal>
  );
}
