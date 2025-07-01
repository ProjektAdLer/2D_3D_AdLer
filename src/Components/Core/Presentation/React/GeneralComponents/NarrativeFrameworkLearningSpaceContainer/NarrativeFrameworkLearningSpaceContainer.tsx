import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkLearningSpaceContainerViewModel from "./NarrativeFrameworkLearningSpaceContainerViewModel";
import INarrativeFrameworkLearningSpaceContainerController from "./INarrativeFrameworkLearningSpaceContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import NarrativeFramework from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFramework";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import i18next from "i18next";

export default function NarrativeFrameworkLearningSpaceContainer() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkLearningSpaceContainerViewModel,
    INarrativeFrameworkLearningSpaceContainerController
  >(BUILDER_TYPES.INarrativeFrameworkLearningSpaceContainerBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller) return null;
  if (isOpen !== true) return null;

  return (
    <div>
      <StyledModal
        title="Narrative Framework"
        onClose={() => controller.closeModal()}
        showModal={isOpen}
        closeButtonToolTip={i18next
          .t("closeToolTip", { ns: "helpMenu" })
          .toString()}
      >
        <div className="w-[80vw] h-80 mt-10 mobile-landscape:h-32 mobile-landscape:mt-1 mobile-landscape:w-full tablet-portrait:h-[60vh] lg:w-[80vw] lg:h-[50vh] onek:h-[38vh] tablet-portrait:w-[70vw]">
          <NarrativeFramework type="intro" />
        </div>
      </StyledModal>
    </div>
  );
}
