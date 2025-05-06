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
    <div className="w-full h-80 mt-10 mobile-landscape:h-32 mobile-landscape:mt-1 mobile-landscape:w-full tablet-portrait:h-[60vh] lg:w-[70vw] tablet-portrait:w-[70vw]">
      <NarrativeFramework type="intro" />
    </div>
  );
}
