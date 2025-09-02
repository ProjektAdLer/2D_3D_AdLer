import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import HelpDeskModalViewModel from "./HelpDeskModalViewModel";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useCallback } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import TutorialButton from "../Tutorial/TutorialButton";
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
    BUILDER_TYPES.IHelpDeskModalBuilder,
  );
  const scenePresenter = useInjection<ScenePresenterFactory>(
    SCENE_TYPES.ScenePresenterFactory,
  )(LearningSpaceSceneDefinition);

  const { t: translate } = useTranslation("helpMenu");

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
        className={tailwindMerge(className, "rounded-lg p-5")}
        closeButtonToolTip={translate("closeToolTip").toString()}
        data-testid="helpdeskmodal"
      >
        <button
          className="fixed bottom-0 left-0 h-10 w-10"
          data-testid="testInspectorButton"
          onClick={() => {
            scenePresenter.toggleInspector({ overlay: true });
          }}
        ></button>

        <p className="m-2 my-4 font-bold text-adlerdarkblue">
          {translate("explanation")}
        </p>
        <ul className="ml-10 flex list-disc flex-col items-start text-adlerdarkblue">
          <li>{translate("manual")}</li>
          <li>{translate("bug")}</li>
          <li>{translate("logData")}</li>
        </ul>
        <section className="my-6 flex flex-row justify-around gap-2">
          <div className="flex flex-col items-center">
            <TutorialButton
              url={
                "https://projektadler.github.io/Documentation/lernende-bd.html"
              }
            />
            <p className="p-1 text-center font-bold text-adlerdarkblue">
              <Trans i18nKey="manualPDF" ns="helpMenu" />
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BugReportButton />
            <p className="p-1 text-center font-bold text-adlerdarkblue">
              {translate("bugReport")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <LogExportButton />
            <p className="p-1 text-center font-bold text-adlerdarkblue">
              <Trans i18nKey="logExport" ns="helpMenu" />
            </p>
          </div>
        </section>
      </StyledModal>
    </div>
  );
}
