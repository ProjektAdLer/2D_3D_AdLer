import { useInjection } from "inversify-react";
import ILoadLearningWorldUseCase from "../../../../Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "../../../../Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningSpaceSelectionViewModel from "./LearningSpaceSelectionViewModel";
import ILearningSpaceSelectionController from "./ILearningSpaceSelectionController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import LearningSpaceSelectionGraph from "./Graph/LearningSpaceSelectionGraph";
import { ReactFlowProvider } from "reactflow";
import LearningSpaceSelectionList from "./List/LearningSpaceSelectionList";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

export default function LearningSpaceSelection({
  className,
}: AdLerUIComponent) {
  const loadLearningWorldUseCase = useInjection<ILoadLearningWorldUseCase>(
    USECASE_TYPES.ILoadLearningWorldUseCase,
  );
  const getUserLocationUseCase = useInjection<IGetUserLocationUseCase>(
    USECASE_TYPES.IGetUserLocationUseCase,
  );

  const [viewModel, controller] = useBuilder<
    LearningSpaceSelectionViewModel,
    ILearningSpaceSelectionController
  >(BUILDER_TYPES.ILearningSpaceSelectionBuilder);

  const [showGraph, setShowGraph] = useState(true);

  const { t: translate } = useTranslation("spaceMenu");

  useEffect(() => {
    // call load world use case to get relevant data
    const loadLearningWorldAsync = async (): Promise<void> => {
      const worldID = getUserLocationUseCase.execute().worldID;
      if (worldID) await loadLearningWorldUseCase.executeAsync({ worldID });
    };
    if (viewModel) loadLearningWorldAsync();
  }, [viewModel, getUserLocationUseCase, loadLearningWorldUseCase]);

  if (!viewModel || !controller) return null;

  return (
    <div className={tailwindMerge(className, "flex h-full flex-col")}>
      <section className="ml-4 flex flex-shrink-0 flex-row pb-2">
        <span className="text-md mr-3 font-medium text-adlerdarkblue">
          {translate("list")}
        </span>
        <label className="relative inline-flex cursor-pointer">
          <input
            type="checkbox"
            id="toggle"
            checked={showGraph}
            onChange={(e) => setShowGraph(e.target.checked)}
            value=""
            className="peer sr-only"
            data-testid="spaceselection-toggle"
          ></input>
          <div className="peer-checked:adlerdarkblue h-6 w-11 rounded-full bg-adlerdarkblue after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600"></div>
          <span className="text-md ml-3 font-medium text-adlerdarkblue">
            {translate("graph")}
          </span>
        </label>
      </section>

      <div className="min-h-0 flex-1">
        {showGraph && (
          <ReactFlowProvider>
            <LearningSpaceSelectionGraph
              controller={controller}
              viewModel={viewModel}
            />
          </ReactFlowProvider>
        )}
        {!showGraph && (
          <LearningSpaceSelectionList
            controller={controller}
            viewModel={viewModel}
          />
        )}
      </div>
    </div>
  );
}
