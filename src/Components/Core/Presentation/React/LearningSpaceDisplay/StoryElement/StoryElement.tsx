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
import { useCallback, useEffect, useRef } from "react";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";
import { getNPCImage } from "../../../Utils/GetNPCImage";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

const npcTalkingSoundLink = require("../../../../../../Assets/Sounds/NPCTalking.mp3");

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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    const settings = CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).execute();
    audioRef.current = new Audio(npcTalkingSoundLink);
    audioRef.current.volume = settings.volume ?? 0.5;
  }, []);

  // Play sound when modal is shown with 0.25 second delay
  useEffect(() => {
    if (
      isOpen &&
      storyTypeToDisplay !== StoryElementType.None &&
      audioRef.current
    ) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 250);
    }
  }, [isOpen, storyTypeToDisplay]);

  // Play sound when slide changes
  const handleSlideChange = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, []);

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
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-screen flex-col items-center justify-center bg-blacktrans lg:grid lg:grid-rows-3 lg:items-start">
        {/* Desktop NPC Thumbnail */}
        <div className="invisible relative row-start-2 flex w-full items-end justify-start pl-16 lg:visible lg:h-full">
          <div className="bubblecornertopleft absolute bottom-0 left-44 z-50 h-16 w-8 bg-buttonbgblue"></div>
          <img
            className="invisible z-20 h-0 -scale-x-100 object-contain brightness-125 lg:visible lg:h-full"
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
        <div className="z-50 row-start-3 flex h-[80vh] w-full max-w-7xl items-start justify-center overflow-auto pb-2 pt-2 lg:h-[26vh] lg:w-[95vw] lg:pt-0 xl:h-[28vh]">
          <div className="flex h-full w-full max-w-[95%] flex-col justify-between gap-2 rounded-lg bg-buttonbgblue p-2 xl:px-8">
            {/* Header */}
            <div className="lg:roboto-black z-20 flex items-start justify-center gap-2 overflow-hidden pt-2 text-xl font-bold text-adlerdarkblue lg:max-w-5xl lg:text-2xl xl:max-w-6xl">
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
                className="roboto-black h-8 w-8 p-1 text-xs sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10 lg:text-lg xl:h-6 xl:w-6 onek:h-10 onek:w-10"
                title={translate("closeStoryToolTip").toString()}
              >
                <img
                  src={closeIcon}
                  className="sm:w-6 md:w-8 lg:w-10"
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
                onSlideChange={handleSlideChange}
              />
            )}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
