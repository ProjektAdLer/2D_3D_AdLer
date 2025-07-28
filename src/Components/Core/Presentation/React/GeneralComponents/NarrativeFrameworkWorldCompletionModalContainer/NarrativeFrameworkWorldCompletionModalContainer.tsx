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
    <div className="h-80 w-full">
      <NarrativeFramework type="outro" />
    </div>
  );
}
