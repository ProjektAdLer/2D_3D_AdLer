import campusNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas.png";
import campusNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas_close.png";
import arcadeNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_sheriffjustice.png";
import arcadeNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_sheriffjustice_close.png";
import defaultNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_defaultnpc.png";
import defaultNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_defaultnpc_close.png";
import robotNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_alerobot.png";
import robotNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_alerobot_close.png";
import closeIcon from "../../../../../../Assets/icons/53-close/close-icon-nobg.svg";

import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StoryElementViewModel from "./StoryElementViewModel";
import IStoryElementController from "./IStoryElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useTranslation } from "react-i18next";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import {
  LearningElementModel,
  LearningElementModelTypeEnums,
} from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";
import StorySelection from "./StorySelection";
import SingleStoryLayout from "./SingleStoryLayout";
import { useEffect, useState } from "react";

function getNPCImage(
  model: LearningElementModel | null,
  close: boolean
): string {
  switch (model) {
    case LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC:
      return close ? robotNPCClose : robotNPC;
    case LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC:
      return close ? arcadeNPCClose : arcadeNPC;
    case LearningElementModelTypeEnums.QuizElementModelTypes.CampusNPC:
      return close ? campusNPCClose : campusNPC;
    case LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC:
    default:
      return close ? defaultNPCClose : defaultNPC;
  }
}

export default function StoryElement({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    StoryElementViewModel,
    IStoryElementController
  >(BUILDER_TYPES.IStoryElementBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [storyTypeToDisplay] = useObservable<StoryElementType>(
    viewModel?.storyTypeToDisplay
  );
  const [outroUnlocked] = useObservable<boolean>(viewModel?.isOutroUnlocked);
  const [introCutsceneRunning] = useObservable<boolean>(
    viewModel?.isIntroCutsceneRunning
  );
  const [outroCutsceneRunning] = useObservable<boolean>(
    viewModel?.isOutroCutsceneRunning
  );
  const [introModelType] = useObservable(viewModel?.introModelType);
  const [outroModelType] = useObservable(viewModel?.outroModelType);

  const [titleText, setTitleText] = useState("");
  const [contentTexts, setContentTexts] = useState<string[]>([""]);

  const { t: translate } = useTranslation("learningSpace");

  useEffect(() => {
    if (!viewModel) return;

    switch (storyTypeToDisplay) {
      case StoryElementType.Intro:
        setTitleText(translate("introStoryTitle").toString());
        setContentTexts(viewModel.introTexts.Value);
        break;
      case StoryElementType.Outro:
        setTitleText(translate("outroStoryTitle").toString());
        if (outroUnlocked) setContentTexts(viewModel.outroTexts.Value);
        else
          setContentTexts(translate("outroLockedText").toString().split("\n"));
        break;
      case StoryElementType.IntroOutro:
        setTitleText(translate("introOutroStoryTitle").toString());
        break;
      case StoryElementType.None:
      default:
        break;
    }
  }, [viewModel, storyTypeToDisplay, outroUnlocked, translate]);

  if (!viewModel || !controller) return null;
  if (!isOpen || storyTypeToDisplay === StoryElementType.None) return null;

  return (
    <StyledContainer className={tailwindMerge(className, "")}>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-full bg-blacktrans lg:grid lg:grid-rows-3 lg:items-start">
        {/* Desktop NPC Thumbnail */}
        <div className="flex items-end justify-start invisible w-full row-start-2 pl-16 lg:visible lg:h-full">
          <img
            className="z-20 invisible object-contain h-0 -scale-x-100 brightness-125 lg:visible lg:h-full "
            alt="LearningImage!"
            data-testid="npcImage"
            src={getNPCImage(
              (storyTypeToDisplay & StoryElementType.Intro) ===
                StoryElementType.Intro
                ? introModelType
                : outroModelType,
              true
            )}
          />
        </div>

        {/* Modal */}
        <div className="flex items-start justify-center pb-2 w-full lg:w-[95vw] max-w-7xl lg:max-h-[30vh] xl:max-h-[32vh] pt-2 lg:pt-0 row-start-3 overflow-auto">
          <div className="flex flex-col p-2 xl:px-8 gap-2 justify-center rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto h-full w-full max-w-[95%]">
            {/* Header */}
            <div className="z-20 flex items-start justify-center gap-2 py-2 pb-3 overflow-hidden text-xl font-bold lg:max-w-5xl xl:max-w-6xl text-adlerdarkblue lg:roboto-black lg:text-2xl ">
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
                  false
                )}
              />

              {/* Title */}
              <div className="w-full lg:text-xl">{titleText}</div>

              {/* Close Button (only in selection) */}
              {storyTypeToDisplay === StoryElementType.IntroOutro && (
                <StyledButton
                  onClick={() => controller.closePanel()}
                  className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
                  shape="closeButton"
                >
                  <img
                    src={closeIcon}
                    className="lg:w-10 md:w-8 sm:w-6"
                    alt="CloseButton"
                  />
                </StyledButton>
              )}
            </div>

            {/* Content */}
            {storyTypeToDisplay === StoryElementType.IntroOutro && (
              <StorySelection controller={controller} />
            )}

            {(storyTypeToDisplay === StoryElementType.Intro ||
              storyTypeToDisplay === StoryElementType.Outro) && (
              <SingleStoryLayout
                contentTexts={contentTexts}
                controller={controller}
                withBackButton={
                  !introCutsceneRunning &&
                  outroUnlocked &&
                  !outroCutsceneRunning &&
                  introModelType !== undefined &&
                  outroModelType !== undefined
                }
              />
            )}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
