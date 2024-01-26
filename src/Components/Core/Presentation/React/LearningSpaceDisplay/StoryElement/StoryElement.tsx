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

  let titleText =
    type === StoryElementType.Intro
      ? translate("introStoryTitle").toString()
      : translate("outroStoryTitle").toString();

  return (
    <StyledModal
      title={titleText}
      onClose={() => {
        closeModal();
        controller.closePanel();
      }}
      showModal={isOpen}
      className={tailwindMerge(
        className,
        "flex flex-col justify-center gap-2 p-5 rounded-lg"
      )}
    >
      {viewModel.texts.Value[pageId].toString()}
      <div className="flex justify-center gap-2">
        {pageId < viewModel.texts.Value.length - 1 && (
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
    </StyledModal>
  );
}
