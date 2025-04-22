import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkLoadingScreenContainerViewModel from "./NarrativeFrameworkLoadingScreenContainerViewModel";
import INarrativeFrameworkLoadingScreenContainerController from "./INarrativeFrameworkLoadingScreenContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import NarrativeFramework from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFramework";

export default function NarrativeFrameworkLoadingScreenContainer() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkLoadingScreenContainerViewModel,
    INarrativeFrameworkLoadingScreenContainerController
  >(BUILDER_TYPES.INarrativeFrameworkLoadingScreenContainerBuilder);
  const [isShowingContent] = useObservable<boolean>(
    viewModel?.isShowingContent,
  );

  if (!viewModel || !controller) return null;
  if (isShowingContent !== true) return null;

  return (
    <div className="w-full h-[60svh]">
      <NarrativeFramework type="intro" />
    </div>
  );
}
