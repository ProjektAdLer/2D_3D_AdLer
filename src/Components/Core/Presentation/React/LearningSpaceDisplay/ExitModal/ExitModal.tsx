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
import spaceSolved from "../../../../../../Assets/icons/check-solution.svg";
import spaceAvailable from "../../../../../../Assets/icons/unlocked.svg";
import spaceLocked from "../../../../../../Assets/icons/locked.svg";
import { useTranslation } from "react-i18next";

export default function ExitModal({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    ExitModalViewModel,
    IExitModalController
  >(BUILDER_TYPES.IExitModalBuilder);
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const { t: translate } = useTranslation("learningSpace");

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  return (
    <StyledModal
      title={translate(viewModel.modalTitle.Value).toString()}
      onClose={closeModal}
      showModal={isOpen}
      className={tailwindMerge(
        className,
        "flex flex-col justify-center gap-2 p-5 rounded-lg",
      )}
    >
      <StyledButton
        disabled={false}
        shape="freeFloatCenter"
        className="flex w-[100%] mb-2 "
        onClick={controller.onExitButtonClicked}
      >
        {translate(viewModel.exitButtonTitle.Value).toString()}
      </StyledButton>

      {viewModel.isExit.Value &&
        viewModel.successorSpaces.Value.length > 0 &&
        viewModel.successorSpaces.Value.map((successorSpace) => {
          return createSpaceButton(successorSpace, controller);
        })}
      {!viewModel.isExit.Value &&
        viewModel.precursorSpaces.Value.length > 0 &&
        viewModel.precursorSpaces.Value.map(
          (precursorSpace: LearningSpaceTO) => {
            return createSpaceButton(precursorSpace, controller);
          },
        )}
    </StyledModal>
  );
}

function createSpaceButton(
  learningSpaceTO: LearningSpaceTO,
  controller: IExitModalController,
) {
  let icon: string;
  if (learningSpaceTO.currentScore >= learningSpaceTO.requiredScore)
    icon = spaceSolved;
  else if (learningSpaceTO.isAvailable) icon = spaceAvailable;
  else icon = spaceLocked;

  return (
    <StyledButton
      icon={icon}
      key={learningSpaceTO.id}
      disabled={!learningSpaceTO.isAvailable}
      shape="freeFloatCenter"
      className="flex w-[100%] mb-2"
      onClick={() =>
        controller.onPrecursorOrSuccessorSpaceClicked(learningSpaceTO.id)
      }
    >
      {learningSpaceTO.name + " betreten"}
    </StyledButton>
  );
}
