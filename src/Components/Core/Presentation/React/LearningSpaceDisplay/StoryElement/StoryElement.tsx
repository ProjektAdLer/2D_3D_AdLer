import closeIcon from "../../../../../../Assets/icons/close.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StoryElementViewModel from "./StoryElementViewModel";
import IStoryElementController from "./IStoryElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useTranslation } from "react-i18next";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StorySelection from "./StorySelection";
import SingleStoryLayout from "./SingleStoryLayout";
import { useCallback } from "react";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";
import { getNPCImage } from "../../../Utils/GetNPCImage";

export default function StoryElement({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    StoryElementViewModel,
    IStoryElementController
  >(BUILDER_TYPES.IStoryElementBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [storyTypeToDisplay] = useObservable<StoryElementType>(
    viewModel?.storyTypeToDisplay,
  );
  const [outroUnlocked] = useObservable<boolean>(viewModel?.isOutroUnlocked);
  const [introCutsceneRunning] = useObservable<boolean>(
    viewModel?.isIntroCutsceneRunning,
  );
  const [outroCutsceneRunning] = useObservable<boolean>(
    viewModel?.isOutroCutsceneRunning,
  );
  const [introModelType] = useObservable(viewModel?.introModelType);
  const [outroModelType] = useObservable(viewModel?.outroModelType);

  const [introEmotion] = useObservable(viewModel?.introEmotion);
  const [outroEmotion] = useObservable(viewModel?.outroEmotion);

  const { t: translate } = useTranslation("learningSpace");

  const getTitleText = useCallback(() => {
    switch (storyTypeToDisplay) {
      case StoryElementType.Intro:
        return translate("introStoryTitle").toString();
      case StoryElementType.Outro:
        return translate("outroStoryTitle").toString();
      case StoryElementType.IntroOutro:
        return translate("introOutroStoryTitle").toString();
      case StoryElementType.None:
      default:
        return "";
    }
  }, [storyTypeToDisplay, translate]);

  const getContentTexts = useCallback(() => {
    switch (storyTypeToDisplay) {
      case StoryElementType.Intro:
        return viewModel.introTexts.Value;
      case StoryElementType.Outro:
        if (outroUnlocked) return viewModel.outroTexts.Value;
        else return [translate("outroLockedText").toString()];
      default:
        return [];
    }
  }, [viewModel, storyTypeToDisplay, outroUnlocked, translate]);

  if (!viewModel || !controller) return null;
  if (!isOpen || storyTypeToDisplay === StoryElementType.None) return null;

  return (
    <StyledContainer className={tailwindMerge(className, "")}>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-full bg-blacktrans lg:grid lg:grid-rows-3 lg:items-start">
        {/* Desktop NPC Thumbnail */}
        <div className="relative flex items-end justify-start invisible w-full row-start-2 pl-16 lg:visible lg:h-full">
          <div className="absolute bottom-0 z-50 w-8 h-16 left-44 bg-buttonbgblue bubblecornertopleft"></div>
          <img
            className="z-20 invisible object-contain h-0 -scale-x-100 brightness-125 lg:visible lg:h-full "
            alt="LearningImage!"
            data-testid="npcImage"
            src={getNPCImage(
              (storyTypeToDisplay & StoryElementType.Intro) ===
                StoryElementType.Intro
                ? introModelType
                : outroModelType,
              true,
              (storyTypeToDisplay & StoryElementType.Intro) ===
                StoryElementType.Intro
                ? introEmotion
                : outroEmotion,
            )}
          />
        </div>

        {/* Modal */}
        <div className="z-50 flex items-start justify-center pb-2 w-full lg:w-[95vw] max-w-7xl lg:max-h-[30vh] xl:max-h-[32vh] pt-2 lg:pt-0 row-start-3 overflow-auto">
          <div className="flex flex-col p-2 xl:px-8 gap-2 justify-center rounded-lg bg-buttonbgblue h-full w-full max-w-[95%]">
            {/* Header */}
            <div className="z-20 flex items-start justify-center gap-2 pt-2 overflow-hidden text-xl font-bold lg:max-w-5xl xl:max-w-6xl text-adlerdarkblue lg:roboto-black lg:text-2xl ">
              {/* Mobile NPC Thumbnail */}
              <img
                className="visible h-16 -scale-x-100 lg:invisible lg:h-0"
                alt="LearningImage!"
                date-testid="npcImage"
                src={getNPCImage(
                  (storyTypeToDisplay & StoryElementType.Intro) ===
                    StoryElementType.Intro
                    ? introModelType
                    : outroModelType,
                  false,
                  (storyTypeToDisplay & StoryElementType.Intro) ===
                    StoryElementType.Intro
                    ? introEmotion
                    : outroEmotion,
                )}
              />

              {/* Title */}
              <div className="w-full lg:text-lg">
                {storyTypeToDisplay & StoryElementType.Intro
                  ? (viewModel.introModelName.Value ?? getTitleText())
                  : (viewModel.outroModelName.Value ?? getTitleText())}
              </div>

              {/* Close Button */}
              <CloseButton
                onClick={() => controller.closePanel()}
                className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10 lg:text-lg"
                title={translate("closeStoryToolTip").toString()}
              >
                <img
                  src={closeIcon}
                  className="lg:w-10 md:w-8 sm:w-6"
                  alt="CloseButton"
                />
              </CloseButton>
            </div>

            {/* Content */}
            {storyTypeToDisplay === StoryElementType.IntroOutro && (
              <StorySelection controller={controller} />
            )}

            {(storyTypeToDisplay === StoryElementType.Intro ||
              storyTypeToDisplay === StoryElementType.Outro) && (
              <SingleStoryLayout
                contentTexts={getContentTexts()}
                controller={controller}
                withBackButton={
                  !introCutsceneRunning &&
                  outroUnlocked &&
                  !outroCutsceneRunning &&
                  introModelType !== undefined &&
                  outroModelType !== undefined &&
                  introModelType === outroModelType
                }
              />
            )}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
