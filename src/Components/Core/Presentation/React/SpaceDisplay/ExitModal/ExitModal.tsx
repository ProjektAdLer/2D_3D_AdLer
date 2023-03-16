import useObservable from "../../../React/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../../React/ReactRelated/CustomHooks/useBuilder";
import ExitModalViewModel from "./ExitModalViewModel";
import StyledModal from "../../../React/ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../../React/ReactRelated/ReactBaseComponents/StyledButton";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import IExitModalController from "./IExitModalController";
import { useCallback } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function ExitModal({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    ExitModalViewModel,
    IExitModalController
  >(BUILDER_TYPES.IExitModalBuilder);
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  return (
    <div>
      <StyledModal
        title={viewModel.modalTitle.Value}
        onClose={closeModal}
        showModal={isOpen}
        className={tailwindMerge(
          className,
          "flex flex-col justify-center gap-2 p-2 m-3 rounded-lg"
        )}
      >
        <StyledButton
          disabled={false}
          shape="freefloatcenter"
          className="flex w-[100%]"
          onClick={controller.onExitButtonClicked}
        >
          {viewModel.exitButtonTitle.Value}
        </StyledButton>
      </StyledModal>
    </div>
  );
}
