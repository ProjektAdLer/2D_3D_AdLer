import { useInjection } from "inversify-react";
import ILoadWorldUseCase from "../../../../Application/UseCases/LoadWorld/ILoadWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetCurrentUserLocationUseCase from "../../../../Application/UseCases/GetCurrentUserLocation/IGetCurrentUserLocationUseCase";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";
import ISpaceSelectionController from "./ISpaceSelectionController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect } from "react";
import SpaceSelectionGraph from "./Graph/SpaceSelectionGraph";
import { ReactFlowProvider } from "reactflow";
import SpaceSelectionList from "./List/SpaceSelectionList";

export default function SpaceSelection() {
  const loadWorldUseCase = useInjection<ILoadWorldUseCase>(
    USECASE_TYPES.ILoadWorldUseCase
  );
  const getCurrentUserLocationUseCase =
    useInjection<IGetCurrentUserLocationUseCase>(
      USECASE_TYPES.IGetCurrentUserLocationUseCase
    );

  const [viewModel, controller] = useBuilder<
    SpaceSelectionViewModel,
    ISpaceSelectionController
  >(BUILDER_TYPES.ISpaceSelectionBuilder);

  useEffect(() => {
    // call load world use case to get relevant data
    const loadWorldAsync = async (): Promise<void> => {
      const worldID = getCurrentUserLocationUseCase.execute().worldID;
      await loadWorldUseCase.executeAsync({ worldID });
    };
    if (viewModel) loadWorldAsync();
  }, [viewModel]);

  if (!viewModel || !controller) return null;

  // TODO: add a toggle to switch between graph and list view here
  return (
    // <ReactFlowProvider>
    //   <SpaceSelectionGraph controller={controller} viewModel={viewModel} />
    // </ReactFlowProvider>
    <SpaceSelectionList controller={controller} viewModel={viewModel} />
  );
}
