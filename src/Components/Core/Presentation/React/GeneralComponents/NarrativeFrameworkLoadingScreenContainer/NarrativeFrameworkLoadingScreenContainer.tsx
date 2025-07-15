import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkLoadingScreenContainerViewModel from "./NarrativeFrameworkLoadingScreenContainerViewModel";
import INarrativeFrameworkLoadingScreenContainerController from "./INarrativeFrameworkLoadingScreenContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import NarrativeFramework from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFramework";
import ControlsExplanationContent from "../ControlsExplanationModal/ControlsExplanationContent";

export default function NarrativeFrameworkLoadingScreenContainer() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkLoadingScreenContainerViewModel,
    INarrativeFrameworkLoadingScreenContainerController
  >(BUILDER_TYPES.INarrativeFrameworkLoadingScreenContainerBuilder);
  const [isShowingContent] = useObservable<boolean>(
    viewModel?.isShowingContent,
  );
  const [showNarrativeFramework] = useObservable<boolean>(
    viewModel?.showNarrativeFramework,
  );

  if (!viewModel || !controller) return null;
  if (isShowingContent !== true) return null;

  return (
    <div className="mt-10 h-80 w-full lg:w-[70vw] mobile-landscape:mt-1 mobile-landscape:h-32 mobile-landscape:w-full tablet-portrait:h-[60vh] tablet-portrait:w-[70vw]">
      {showNarrativeFramework ? (
        <NarrativeFramework type="intro" />
      ) : (
        <div className="h-full overflow-y-auto rounded-lg bg-buttonbgblue p-4 px-8">
          <ControlsExplanationContent />
        </div>
      )}
    </div>
  );
}
