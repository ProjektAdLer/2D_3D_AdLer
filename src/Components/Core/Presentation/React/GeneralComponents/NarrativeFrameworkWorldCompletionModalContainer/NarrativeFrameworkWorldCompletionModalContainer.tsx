import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkWorldCompletionModalContainerViewModel from "./NarrativeFrameworkWorldCompletionModalContainerViewModel";
import INarrativeFrameworkWorldCompletionModalContainerController from "./INarrativeFrameworkWorldCompletionModalContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import NarrativeFramework from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFramework";

export default function NarrativeFrameworkWorldCompletionModalContainer() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkWorldCompletionModalContainerViewModel,
    INarrativeFrameworkWorldCompletionModalContainerController
  >(BUILDER_TYPES.INarrativeFrameworkWorldCompletionModalContainerBuilder);

  if (!viewModel || !controller) return null;

  return (
    <div className="mt-10 w-full lg:w-[70vw] mobile-landscape:mt-1 mobile-landscape:h-32 mobile-landscape:w-full tablet-portrait:h-[60vh] tablet-portrait:w-[70vw]">
      <NarrativeFramework type="outro" />
    </div>
  );
}
