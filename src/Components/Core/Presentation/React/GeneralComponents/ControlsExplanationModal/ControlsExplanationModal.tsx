import ControlsExplanationModalViewModel from "./ControlsExplanationModalViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { useTranslation } from "react-i18next";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import React, { useState } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ControlsExplanationContent from "./ControlsExplanationContent";

export default function ControlsExplanationModal({
  className,
}: AdLerUIComponent<{}>) {
  const [viewModel] = useBuilder<ControlsExplanationModalViewModel, undefined>(
    BUILDER_TYPES.IControlsExplanationModalBuilder
  );
  const { t: translate } = useTranslation("controls");

  const [isOpen, setIsOpen] = useObservable(viewModel?.isOpen);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationShownOnce, setConfirmationShownOnce] = useState(true);

  if (!viewModel) return null;
  if (!isOpen && !showConfirmation) return null;

  return (
    <React.Fragment>
      {/* Confirmation Notice */}
      <StyledModal
        title={translate("title")!}
        showModal={showConfirmation && !confirmationShownOnce}
        canClose={false}
      >
        <div className="w-[90vw] max-w-6xl flex flex-row portrait:flex-col justify-between gap-12">
          <p>{translate("confirmation")}</p>
          <div className="flex flex-row gap-4">
            <StyledButton
              onClick={() => {
                setConfirmationShownOnce(true);
              }}
            >
              OK!
            </StyledButton>
          </div>
        </div>
      </StyledModal>

      {/* Main Modal */}
      <StyledModal
        className={tailwindMerge(className, "")}
        title={translate("title")!}
        showModal={isOpen}
        onClose={() => {
          setIsOpen(false);
          setShowConfirmation(true);
        }}
      >
        <ControlsExplanationContent
          className={tailwindMerge(
            className,
            "max-w-[90vw] max-h-[80vh] max-w-6xl"
          )}
        />
      </StyledModal>
    </React.Fragment>
  );
}
