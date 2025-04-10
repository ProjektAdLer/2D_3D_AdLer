import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ILearningWorldCompletionModalController from "./ILearningWorldCompletionModalController";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import SolutionIcon from "../../../../../../Assets/icons/world-completed.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import NarrativeFrameworkWorldCompletionModalContainer from "~ReactComponents/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/NarrativeFrameworkWorldCompletionModalContainer";

export default function LearningWorldCompletionModal({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningWorldCompletionModalViewModel,
    ILearningWorldCompletionModalController
  >(BUILDER_TYPES.ILearningWorldCompletionModalBuilder);

  const [showModal] = useObservable(viewModel.showModal);
  const [evaluationLink] = useObservable(viewModel.evaluationLink);

  const { t: translate } = useTranslation("spaceMenu");

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      className={tailwindMerge(
        className,
        "flex flex-col items-center justify-center",
      )}
      title={translate("learningWorldCompleted").toString()}
      showModal={showModal}
      onClose={() => {
        controller.CloseButtonClicked();
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {
          <img
            className="w-32 mb-4 mobile-landscape:w-16 mobile-portrait:w-16"
            src={SolutionIcon}
            alt=""
          ></img>
        }
        <div className="w-full flex flex-col items-center justify-center">
          <p className="mb-4">{translate("congratulation")}</p>
          {viewModel.worldCompletionText && (
            <div className="flex justify-center">
              {viewModel.worldCompletionText}
            </div>
          )}
          <NarrativeFrameworkWorldCompletionModalContainer />
          {evaluationLink && (
            <div>
              <div className="flex justify-center">
                <a
                  className="m-3 text-2xl font-bold underline text-adlergreen"
                  href={evaluationLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate("survey")}
                </a>
              </div>
              <div className="flex justify-center m-2 font-bold">
                <p>{translate("thanks")}</p>
              </div>
            </div>
          )}

          <p>
            {translate("link_Homepage")}
            <a
              className="font-bold underline text-adlergreen"
              href="https://projekt-adler.eu"
              target="_blank"
              rel="noreferrer"
            >
              Homepage
            </a>
            .
          </p>
        </div>
      </div>
    </StyledModal>
  );
}
