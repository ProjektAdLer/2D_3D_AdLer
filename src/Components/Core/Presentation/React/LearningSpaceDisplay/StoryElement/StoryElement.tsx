import campusNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas.png";
import campusNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas_close.png";
import arcadeNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_sheriffjustice.png";
import arcadeNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_sheriffjustice_close.png";
import defaultNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_defaultnpc.png";
import defaultNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_defaultnpc_close.png";
import robotNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_alerobot.png";
import robotNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_alerobot_close.png";

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
  const [pageId] = useObservable<number>(viewModel?.pageId);
  const [pickedStory] = useObservable<StoryElementType>(viewModel?.pickedStory);

  useObservable<boolean>(viewModel?.showOnlyIntro);
  useObservable<boolean>(viewModel?.showOnlyOutro);
  useObservable<boolean>(viewModel?.outroUnlocked);

  const { t: translate } = useTranslation("learningSpace");

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  // Cases (~FK):
  // 1. Intro OR Split IntroOutro, Intro selected OR locked IntroOutro
  // 2. Unlocked Outro OR Split IntroOutro, unlocked Outro selected OR just now unlocked IntroOutro
  // 3. Locked Outro OR Split IntroOutro, locked Outro selected
  // 4. IntroOutro, but not just unlocked (Menu)
  // 4.1 IntroOutro, Intro selected (Back to Menu Button)
  // 4.2 IntroOutro, Outro selected (Back to Menu Button)

  let titleText = "";
  let contentTexts = [""];
  let complexStory = false;
  // We only use the first element of the array. If we have 2 stories, we decide based on the picked story. ~FK
  let type = viewModel.type.Value[0];
  let isSplitStory = viewModel.isSplitStory.Value;

  // 1
  if (
    (type === StoryElementType.Intro && !isSplitStory) ||
    (isSplitStory && pickedStory === StoryElementType.Intro) ||
    (type === StoryElementType.IntroOutro && !viewModel.outroUnlocked.Value)
  ) {
    titleText = translate("introStoryTitle").toString();
    contentTexts = viewModel.introTexts.Value;
  }
  // 2
  else if (
    (type === StoryElementType.Outro &&
      viewModel.outroUnlocked.Value &&
      !isSplitStory) ||
    (isSplitStory &&
      pickedStory === StoryElementType.Outro &&
      viewModel.outroUnlocked.Value) ||
    (type === StoryElementType.IntroOutro &&
      viewModel.outroJustNowUnlocked.Value)
  ) {
    titleText = translate("outroStoryTitle").toString();
    contentTexts = viewModel.outroTexts.Value;
  }
  // 3
  else if (
    (type === StoryElementType.Outro &&
      !viewModel.outroUnlocked.Value &&
      !isSplitStory) ||
    (viewModel.isSplitStory &&
      pickedStory === StoryElementType.Outro &&
      !viewModel.outroUnlocked.Value)
  ) {
    titleText = translate("outroStoryTitle").toString();
    contentTexts = translate("outroLockedText").toString().split("\n");
  }
  // 4, 4.1, 4.2
  else if (type === StoryElementType.IntroOutro) {
    complexStory = true;
    // 4
    if (!viewModel.showOnlyIntro.Value && !viewModel.showOnlyOutro.Value) {
      titleText = translate("introOutroStoryTitle").toString();
    }
    // 4.1
    else if (viewModel.showOnlyIntro.Value) {
      titleText = translate("introStoryTitle").toString();
      contentTexts = viewModel.introTexts.Value;
    }
    // 4.2
    else if (viewModel.showOnlyOutro.Value) {
      titleText = translate("outroStoryTitle").toString();
      contentTexts = viewModel.outroTexts.Value;
    }
  } else {
    return null;
  }

  return (
    <StyledContainer className={tailwindMerge(className, "")}>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-full bg-blacktrans lg:grid lg:grid-rows-3 lg:items-start">
        {/* Background NPC */}
        <div className="flex items-end justify-start invisible w-full row-start-2 pl-16 lg:visible lg:h-full">
          <img
            className="z-20 invisible object-contain h-0 -scale-x-100 brightness-125 lg:visible lg:h-full "
            alt="LearningImage!"
            src={getNPCImage(viewModel.modelType.Value[0], true)}
          ></img>
        </div>
        {/* Modal */}
        <div className="flex items-start justify-center pb-2 w-full lg:w-[95vw] max-w-7xl lg:max-h-[32vh] pt-2 lg:pt-0 row-start-3 ">
          <div className="flex flex-col p-2 xl:px-8 gap-2 justify-center rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto h-full w-full max-w-[95%]">
            {/* Header */}
            <div className="z-20 flex items-start justify-center lg:max-w-5xl xl:max-w-6xl gap-2 py-2 pb-3 overflow-hidden text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl ">
              <img
                className="visible h-16 -scale-x-100 lg:invisible lg:h-0"
                alt="LearningImage!"
                src={getNPCImage(viewModel.modelType.Value[0], false)}
              ></img>

              <div className="w-full lg:text-xl">{titleText}</div>

              <StyledButton
                onClick={controller.closePanel}
                className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
                shape="closebutton"
              >
                X
              </StyledButton>
            </div>
            {!complexStory &&
              createBasicLayout(contentTexts, pageId, controller)}
            {complexStory && (
              <>
                {!viewModel.showOnlyIntro.Value &&
                  !viewModel.showOnlyOutro.Value && (
                    <div className="flex flex-col items-center justify-center w-full row-span-4 gap-4 pb-16 lg:flex-row lg:pb-8">
                      <StyledButton
                        shape="freefloatcenter"
                        onClick={controller.onIntroButtonClicked}
                        className="!text-xl w-32"
                      >
                        {translate("introStoryTitle").toString()}
                      </StyledButton>
                      <StyledButton
                        shape="freefloatcenter"
                        onClick={controller.onOutroButtonClicked}
                        className="!text-xl w-32"
                      >
                        {translate("outroStoryTitle").toString()}
                      </StyledButton>
                    </div>
                  )}

                {(viewModel.showOnlyIntro.Value ||
                  viewModel.showOnlyOutro.Value) && (
                  <div className="flex flex-col gap-6 lg:gap-8 items-center justify-center w-full h-full ">
                    {createBasicLayoutWithBackButton(
                      contentTexts,
                      pageId,
                      controller,
                      translate("backButton").toString()
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </StyledContainer>
  );

  function createBasicLayout(
    contentTexts: string[],
    pageId: number,
    controller: IStoryElementController
  ) {
    return (
      <>
        <div className="flex  items-center justify-center p-2 bg-buttonbgblue rounded-xl">
          {contentTexts[pageId].toString()}
        </div>
        <div className="flex w-full min-h-8 lg:max-w-5xl xl:max-w-6xl justify-end">
          <div className="grid w-16 grid-cols-2 lg:w-32 justify-items-end">
            <div>
              {" "}
              {pageId > 0 && (
                <StyledButton
                  shape="closebutton"
                  onClick={controller.decreasePageId}
                >
                  {"\u25C0"}
                </StyledButton>
              )}
            </div>

            <div className="col-start-2">
              {pageId < contentTexts.length - 1 && (
                <StyledButton
                  shape="closebutton"
                  onClick={controller.increasePageId}
                >
                  {"\u25B6"}
                </StyledButton>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  function createBasicLayoutWithBackButton(
    contentTexts: string[],
    pageId: number,
    controller: IStoryElementController,
    backbuttonText: string
  ) {
    return (
      <>
        <div className="flex items-center justify-center  p-2 bg-buttonbgblue rounded-xl">
          {contentTexts[pageId].toString()}
        </div>
        <div className="flex w-full min-h-8 lg:max-w-5xl xl:max-w-6xl justify-between">
          <StyledButton
            shape="freefloatleft"
            onClick={controller.backToMenuButtonClicked}
          >
            {backbuttonText}
          </StyledButton>
          <div className="grid w-16 grid-cols-2 lg:w-32 justify-items-end">
            <div>
              {" "}
              {pageId > 0 && (
                <StyledButton
                  shape="closebutton"
                  onClick={controller.decreasePageId}
                >
                  {"\u25C0"}
                </StyledButton>
              )}
            </div>

            <div className="col-start-2">
              {pageId < contentTexts.length - 1 && (
                <StyledButton
                  shape="closebutton"
                  onClick={controller.increasePageId}
                >
                  {"\u25B6"}
                </StyledButton>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
