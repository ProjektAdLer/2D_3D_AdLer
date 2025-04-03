import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkWorldCompletionModalContainerViewModel from "./NarrativeFrameworkWorldCompletionModalContainerViewModel";
import INarrativeFrameworkWorldCompletionModalContainerController from "./INarrativeFrameworkWorldCompletionModalContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import NarrativeFramework from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFramework";

export default function NarrativeFrameworkWorldCompletionModalContainer() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkWorldCompletionModalContainerViewModel,
    INarrativeFrameworkWorldCompletionModalContainerController
  >(BUILDER_TYPES.INarrativeFrameworkWorldCompletionModalContainerBuilder);
  const [isShowingContent] = useObservable<boolean>(
    viewModel?.isShowingContent,
  );

  if (!viewModel || !controller) return null;
  if (isShowingContent !== true) return null;

  return (
    <div>
      <NarrativeFramework type="outro" />
    </div>
  );
}
