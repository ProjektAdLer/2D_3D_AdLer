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
  const [isOtherModalOpen] = useObservable(viewModel.isOtherModalOpen);
  const [evaluationLink] = useObservable(viewModel.evaluationLink);
  const [evaluationLinkName] = useObservable(viewModel.evaluationLinkName);
  const [evaluationLinkText] = useObservable(viewModel.evaluationLinkText);

  const { t: translate } = useTranslation(["spaceMenu", "helpmenu"]);

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      className={tailwindMerge(
        className,
        "flex flex-col items-center justify-center",
      )}
      title={translate("learningWorldCompleted").toString()}
      showModal={showModal && !isOtherModalOpen}
      onClose={() => {
        controller.CloseButtonClicked();
      }}
      closeButtonToolTip={translate("closeToolTip").toString()}
    >
      <div className="flex flex-col items-center justify-center">
        {
          <img
            className="my-1 w-20 mobile-landscape:w-10 mobile-portrait:w-16"
            src={SolutionIcon}
            alt=""
          ></img>
        }
        <NarrativeFrameworkWorldCompletionModalContainer />
        <div className="flex w-full flex-col items-center justify-center">
          <p className="mt-6 text-lg font-bold"></p>
          {evaluationLink && evaluationLinkName && (
            <div className="flex flex-col justify-center">
              <p className="mt-6 text-lg font-bold">{evaluationLinkName}</p>
              <a
                className="m-3 text-center text-2xl font-bold text-adlergreen underline"
                href={evaluationLink}
                target="_blank"
                rel="noreferrer"
                title={translate("linkToolTip").toString()}
              >
                {translate("furtherLink").toString()}
              </a>
            </div>
          )}

          <div className="break-word m-2 flex max-w-96 justify-center">
            {evaluationLinkText ? (
              <p>{evaluationLinkText}</p>
            ) : (
              <p>{translate("congratulationStandardText")}</p>
            )}
          </div>

          <p className="mt-8 text-sm">
            {translate("link_Homepage")}
            <a
              className="text-center font-bold text-adlergreen underline"
              href="https://projekt-adler.eu"
              target="_blank"
              rel="noreferrer"
              title={translate("homepageToolTip").toString()}
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
