import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkLearningSpaceContainerViewModel from "./NarrativeFrameworkLearningSpaceContainerViewModel";
import INarrativeFrameworkLearningSpaceContainerController from "./INarrativeFrameworkLearningSpaceContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import NarrativeFrameworkIntro from "~ReactComponents/GeneralComponents/NarrativeFrameworkIntro/NarrativeFrameworkIntro";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";

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
      >
        <NarrativeFrameworkIntro type="intro" />
      </StyledModal>
    </div>
  );
}
