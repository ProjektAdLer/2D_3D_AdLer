import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StoryElementViewModel from "./StoryElementViewModel";
import IStoryElementController from "./IStoryElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function StoryElement({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    StoryElementViewModel,
    IStoryElementController
  >(BUILDER_TYPES.IStoryElementBuilder);
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [pageId] = useObservable<number>(viewModel?.pageId);
  const [type] = useObservable<StoryElementType>(viewModel?.type);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const { t: translate } = useTranslation("learningSpace");

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  // Cases:
  // 1. Intro or locked IntroOutro
  // 2. Unlocked Outro or just now unlocked IntroOutro
  // 3. Locked Outro
  // 4. IntroOutro, but not just unlocked (Menu)
  // 4.1 IntroOutro, Intro selected (Back to Menu Button)
  // 4.2 IntroOutro, Outro selected (Back to Menu Button)

  // Debatable if just unlocked IntroOutro is 5 or 2

  let titleText = "";
  let contentTexts = [""];
  let complexStory = false;
  // 1
  if (
    type === StoryElementType.Intro ||
    (type === StoryElementType.IntroOutro && !viewModel.outroUnlocked.Value)
  ) {
    titleText = translate("introStoryTitle").toString();
    contentTexts = viewModel.introTexts.Value!;
  }
  // 2
  else if (
    (type === StoryElementType.Outro && viewModel.outroUnlocked.Value) ||
    (type === StoryElementType.IntroOutro &&
      viewModel.outroJustNowUnlocked.Value)
  ) {
    titleText = translate("outroStoryTitle").toString();
    contentTexts = viewModel.outroTexts.Value!;
  }
  // 3
  else if (type === StoryElementType.Outro && !viewModel.outroUnlocked.Value) {
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
      contentTexts = viewModel.introTexts.Value!;
    }
    // 4.2
    else if (viewModel.showOnlyOutro.Value) {
      titleText = translate("outroStoryTitle").toString();
      contentTexts = viewModel.outroTexts.Value!;
    }
  } else {
    return null;
  }

  return (
    <StyledModal
      title={titleText}
      onClose={closeModal}
      showModal={isOpen}
      className={tailwindMerge(
        className,
        "flex flex-col justify-center gap-2 p-5 rounded-lg"
      )}
    >
      {!complexStory && createBasicLayout(contentTexts, pageId, controller)}
      {complexStory && (
        <>
          {!viewModel.showOnlyIntro && !viewModel.showOnlyOutro && (
            <>
              <StyledButton
                shape="freefloatcenter"
                onClick={controller.onIntroButtonClicked}
              >
                {translate("introStoryTitle").toString()}
              </StyledButton>
              <StyledButton
                shape="freefloatcenter"
                onClick={controller.onOutroButtonClicked}
              >
                {translate("outroStoryTitle").toString()}
              </StyledButton>
            </>
          )}
          {(viewModel.showOnlyIntro || viewModel.showOnlyOutro) &&
            createBasicLayoutWithBackButton(contentTexts, pageId, controller)}
        </>
      )}
    </StyledModal>
  );
}

function createBasicLayout(
  contentTexts: string[],
  pageId: number,
  controller: IStoryElementController
) {
  return (
    <>
      {contentTexts[pageId].toString()}
      <div className="flex justify-center gap-2">
        {pageId < contentTexts.length - 1 && (
          <StyledButton shape="square" onClick={controller.increasePageId}>
            {">"}
          </StyledButton>
        )}
        {pageId > 0 && (
          <StyledButton shape="square" onClick={controller.decreasePageId}>
            {"<"}
          </StyledButton>
        )}
      </div>
    </>
  );
}
function createBasicLayoutWithBackButton(
  contentTexts: string[],
  pageId: number,
  controller: IStoryElementController
) {
  const { t: translate } = useTranslation("learningSpace");
  return (
    <>
      {contentTexts[pageId].toString()}
      <div className="flex justify-center gap-2">
        {pageId < contentTexts.length - 1 && (
          <StyledButton shape="square" onClick={controller.increasePageId}>
            {">"}
          </StyledButton>
        )}
        {pageId > 0 && (
          <StyledButton shape="square" onClick={controller.decreasePageId}>
            {"<"}
          </StyledButton>
        )}
        <StyledButton
          shape="freefloatleft"
          onClick={controller.backToMenuButtonClicked}
        >
          {translate("backButton").toString()}
        </StyledButton>
      </div>
    </>
  );
}
