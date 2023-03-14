import { useInjection } from "inversify-react";
import ILoadWorldUseCase from "../../../../Application/UseCases/LoadWorld/ILoadWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "../../../../Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";
import ISpaceSelectionController from "./ISpaceSelectionController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import SpaceSelectionGraph from "./Graph/SpaceSelectionGraph";
import { ReactFlowProvider } from "reactflow";
import SpaceSelectionList from "./List/SpaceSelectionList";

export default function SpaceSelection() {
  const loadWorldUseCase = useInjection<ILoadWorldUseCase>(
    USECASE_TYPES.ILoadWorldUseCase
  );
  const getUserLocationUseCase = useInjection<IGetUserLocationUseCase>(
    USECASE_TYPES.IGetUserLocationUseCase
  );

  const [viewModel, controller] = useBuilder<
    SpaceSelectionViewModel,
    ISpaceSelectionController
  >(BUILDER_TYPES.ISpaceSelectionBuilder);

  const [showGraph, setShowGraph] = useState(true);

  useEffect(() => {
    // call load world use case to get relevant data
    const loadWorldAsync = async (): Promise<void> => {
      const worldID = getUserLocationUseCase.execute().worldID;
      await loadWorldUseCase.executeAsync({ worldID });
    };
    if (viewModel) loadWorldAsync();
  }, [viewModel, getUserLocationUseCase, loadWorldUseCase]);

  if (!viewModel || !controller) return null;

  return (
    <div className="w-full">
      {
        <div className="flex flex-row ml-4">
          <p className="mr-3 text-md font-[roboto] font-medium text-adlerdarkblue">
            Liste
          </p>
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
            <span className="ml-3 text-md font-[roboto] font-medium text-adlerdarkblue">
              Graph
            </span>
          </label>
        </div>
      }
      {showGraph && (
        <ReactFlowProvider>
          <SpaceSelectionGraph controller={controller} viewModel={viewModel} />
        </ReactFlowProvider>
      )}
      {!showGraph && (
        <SpaceSelectionList controller={controller} viewModel={viewModel} />
      )}
    </div>
  );
}
