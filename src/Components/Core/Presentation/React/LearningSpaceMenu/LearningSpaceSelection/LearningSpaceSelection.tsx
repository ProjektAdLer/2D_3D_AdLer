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
    USECASE_TYPES.ILoadLearningWorldUseCase
  );
  const getUserLocationUseCase = useInjection<IGetUserLocationUseCase>(
    USECASE_TYPES.IGetUserLocationUseCase
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
    <main
      className={tailwindMerge(
        className,
        "w-full flex-col flex portrait:h-[45svh] h-[83svh] lg:h-[93svh] overflow-auto"
      )}
    >
      {
        <section className="flex flex-row ml-4">
          <span className="mr-3 font-medium text-md text-adlerdarkblue">
            {translate("list")}
          </span>
          <label className="relative inline-flex cursor-pointer">
            <input
              type="checkbox"
              id="toggle"
              checked={showGraph}
              onChange={(e) => setShowGraph(e.target.checked)}
              value=""
              className="sr-only peer"
            ></input>
            <div className="w-11 h-6 bg-adlerdarkblue rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:adlerdarkblue"></div>
            <span className="ml-3 font-medium text-md text-adlerdarkblue">
              {translate("graph")}
            </span>
          </label>
        </section>
      }
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
    </main>
  );
}
