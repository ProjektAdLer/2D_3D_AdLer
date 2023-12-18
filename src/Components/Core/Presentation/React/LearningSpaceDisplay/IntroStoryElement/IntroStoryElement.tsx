import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IntroStoryElementViewModel from "./IntroStoryElementViewModel";
import IIntroStoryElementController from "./IIntroStoryElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function IntroStoryElement({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    IntroStoryElementViewModel,
    IIntroStoryElementController
  >(BUILDER_TYPES.IIntroStoryElementBuilder);
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const { t: i18nString } = useTranslation("learningSpace");
  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  return (
    <StyledModal
      title={i18nString("introStoryTitle").toString()}
      onClose={closeModal}
      showModal={isOpen}
      className={tailwindMerge(
        className,
        "flex flex-col justify-center gap-2 p-5 rounded-lg"
      )}
    >
      {viewModel.texts.Value[0].toString()}
    </StyledModal>
  );
}
