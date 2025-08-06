import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkLoadingScreenContainerViewModel from "./NarrativeFrameworkLoadingScreenContainerViewModel";
import INarrativeFrameworkLoadingScreenContainerController from "./INarrativeFrameworkLoadingScreenContainerController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import NarrativeFramework from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFramework";
import LoadingScreenControlsExplanation from "../LoadingScreen/LoadingScreenContent/LoadingScreenControlsExplanation";
import { useEffect, useState } from "react";

export default function NarrativeFrameworkLoadingScreenContainer() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkLoadingScreenContainerViewModel,
    INarrativeFrameworkLoadingScreenContainerController
  >(BUILDER_TYPES.INarrativeFrameworkLoadingScreenContainerBuilder);
  const [isShowingContent] = useObservable<boolean>(
    viewModel?.isShowingContent,
  );
  const [content, setContent] = useState<JSX.Element>(
    <LoadingScreenControlsExplanation />,
  );

  useEffect(() => {
    if (isShowingContent) {
      setContent(
        <div className="mt-10 w-full lg:w-[70vw] mobile-landscape:mt-1 mobile-landscape:h-32 mobile-landscape:w-full tablet-portrait:h-[60vh] tablet-portrait:w-[70vw]">
          <NarrativeFramework type="intro" />
        </div>,
      );
    } else {
      setContent(<LoadingScreenControlsExplanation />);
    }
  }, [isShowingContent]);

  if (!viewModel || !controller) return null;

  return content;
}
