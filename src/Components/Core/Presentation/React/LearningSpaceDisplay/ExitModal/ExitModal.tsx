import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ExitModalViewModel from "./ExitModalViewModel";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import IExitModalController from "./IExitModalController";
import { useCallback } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import spaceSolved from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";

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
  let icon: string;

  return (
    <div>
      <StyledModal
        title={viewModel.modalTitle.Value}
        onClose={closeModal}
        showModal={isOpen}
        className={tailwindMerge(
          className,
          "flex flex-col justify-center gap-2 p-5 rounded-lg"
        )}
      >
        <StyledButton
          disabled={false}
          shape="freefloatcenter"
          className="flex w-[100%] mb-2 "
          onClick={controller.onExitButtonClicked}
        >
          {viewModel.exitButtonTitle.Value}
        </StyledButton>

        {viewModel.doorType.Value === "Exit" &&
          viewModel.successorSpaces.Value.length > 0 &&
          viewModel.successorSpaces.Value.map(
            (successorSpace: LearningSpaceTO) => (
              <>
                {(() => {
                  if (
                    successorSpace.currentScore >= successorSpace.requiredScore
                  )
                    icon = spaceSolved;
                  else if (successorSpace.isAvailable) icon = spaceAvailable;
                  else icon = spaceLocked;
                })()}
                <StyledButton
                  icon={icon}
                  key={successorSpace.id}
                  disabled={!successorSpace.isAvailable}
                  shape="freefloatcenter"
                  className="flex w-[100%] mb-2"
                  onClick={() =>
                    controller.onPrecursorOrSuccessorSpaceClicked(
                      successorSpace.id
                    )
                  }
                >
                  {successorSpace.name + " betreten"}
                </StyledButton>
              </>
            )
          )}
        {viewModel.doorType.Value === "Entry" &&
          viewModel.precursorSpaces.Value.length > 0 &&
          viewModel.precursorSpaces.Value.map(
            (precursorSpace: LearningSpaceTO) => (
              <>
                {(() => {
                  if (
                    precursorSpace.currentScore >= precursorSpace.requiredScore
                  )
                    icon = spaceSolved;
                  else if (precursorSpace.isAvailable) icon = spaceAvailable;
                  else icon = spaceLocked;
                })()}
                <StyledButton
                  icon={icon}
                  key={precursorSpace.id}
                  disabled={!precursorSpace.isAvailable}
                  shape="freefloatcenter"
                  className="flex w-[100%] mb-2"
                  onClick={() =>
                    controller.onPrecursorOrSuccessorSpaceClicked(
                      precursorSpace.id
                    )
                  }
                >
                  {precursorSpace.name + " betreten"}
                </StyledButton>
              </>
            )
          )}
      </StyledModal>
    </div>
  );
}
