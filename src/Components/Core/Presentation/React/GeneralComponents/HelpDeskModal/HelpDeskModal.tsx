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
    <div className="z-50">
      <StyledModal
        title={viewModel.modalTitle}
        onClose={closeModal}
        showModal={isOpen}
        className={tailwindMerge(className, "p-5 rounded-lg")}
      >
        <p className="m-2 my-4 text-adlerdarkblue">
          Falls Probleme mit der AdLer Engine auftreten sollten oder du etwas
          nicht verstehst, kannst du hier:
        </p>
        <ul className="flex flex-col items-start ml-10 list-disc text-adlerdarkblue">
          <li>die AdLer Engine Bedienungsanleitung aufrufen</li>
          <li>Bugs melden...</li>
          <li>...die dazugehörige Log Datei herunterladen</li>
        </ul>
        <section className="flex flex-row justify-around gap-2 my-6">
          <div className="flex flex-col items-center">
            <TutorialPdfButton
              pdfFileUrl={"/manual/adler_user_manual-min.pdf"}
            />
            <p className="p-1 font-bold text-center text-adlerdarkblue">
              AdLer Engine <br></br>Bedienungsanleitung
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BugReportButton />
            <p className="p-1 font-bold text-center text-adlerdarkblue">
              Bug Report
            </p>
          </div>
          <div className="flex flex-col items-center">
            <LogExportButton />
            <p className="p-1 font-bold text-center text-adlerdarkblue">
              Log Export für Bug Report
            </p>
          </div>
        </section>
      </StyledModal>
    </div>
  );
}
