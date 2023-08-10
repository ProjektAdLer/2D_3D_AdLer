import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import HelpDeskModalViewModel from "./HelpDeskModalViewModel";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useCallback } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import TutorialPdfButton from "../Tutorial/TutorialPdfButton";
import LogExportButton from "~ReactComponents/ReactRelated/ReactBaseComponents/LogExportButton";
import BugReportButton from "~ReactComponents/ReactRelated/ReactBaseComponents/BugReportButton";

export default function HelpDeskModal({ className }: AdLerUIComponent<{}>) {
  const [viewModel] = useBuilder<HelpDeskModalViewModel, undefined>(
    BUILDER_TYPES.IHelpDeskModalBuilder
  );
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  if (!viewModel) return null;
  if (!isOpen) return null;

  return (
    <div>
      <StyledModal
        title={viewModel.modalTitle}
        onClose={closeModal}
        showModal={isOpen}
        className={tailwindMerge(
          className,
          "flex flex-col justify-center gap-2 p-5 rounded-lg"
        )}
      >
        <TutorialPdfButton pdfFileUrl={"/manual/adler_user_manual-min.pdf"} />
        <LogExportButton />
        <BugReportButton />
      </StyledModal>
    </div>
  );
}
