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
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { useInjection } from "inversify-react";
import { Trans, useTranslation } from "react-i18next";

export default function HelpDeskModal({ className }: AdLerUIComponent<{}>) {
  const [viewModel] = useBuilder<HelpDeskModalViewModel, undefined>(
    BUILDER_TYPES.IHelpDeskModalBuilder
  );
  const scenePresenter = useInjection<ScenePresenterFactory>(
    SCENE_TYPES.ScenePresenterFactory
  )(LearningSpaceSceneDefinition);

  const { t } = useTranslation();

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
        <button
          className="fixed bottom-0 left-0 w-10 h-10"
          onClick={() => {
            scenePresenter.toggleInspector({ overlay: true });
          }}
        ></button>

        <p className="m-2 my-4 font-bold text-adlerdarkblue">
          {t("helpDesk_explanation", { ns: "menu" })}
        </p>
        <ul className="flex flex-col items-start ml-10 list-disc text-adlerdarkblue">
          <li>{t("helpDesk_manual", { ns: "menu" })}</li>
          <li>{t("helpDesk_bug", { ns: "menu" })}</li>
          <li>{t("helpDesk_logData", { ns: "menu" })}</li>
        </ul>
        <section className="flex flex-row justify-around gap-2 my-6">
          <div className="flex flex-col items-center">
            <TutorialPdfButton
              pdfFileUrl={"/manual/adler_user_manual-min.pdf"}
            />
            <p className="p-1 font-bold text-center text-adlerdarkblue">
              <Trans i18nKey="helpDesk_btn_manual" />
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BugReportButton />
            <p className="p-1 font-bold text-center text-adlerdarkblue">
              {t("helpDesk_btn_bugResport", { ns: "menu" })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <LogExportButton />
            <p className="p-1 font-bold text-center text-adlerdarkblue">
              <Trans i18nKey="helpDesk_btn_logExport" />
            </p>
          </div>
        </section>
      </StyledModal>
    </div>
  );
}
