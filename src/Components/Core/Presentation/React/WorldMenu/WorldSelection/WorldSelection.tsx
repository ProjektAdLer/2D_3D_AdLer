import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import IWorldSelectionController from "./IWorldSelectionController";
import WorldSelectionRow from "./WorldSelectionRow";
import WorldSelectionViewModel, {
  WorldSelectionWorldData,
} from "./WorldSelectionViewModel";

import worldSolved from "../../../../../../Assets/icons/14-1-world-completed/world-completed-icon-nobg.svg";
import worldAvailable from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useInjection } from "inversify-react";
import ILoadUserWorldsUseCase from "src/Components/Core/Application/UseCases/LoadUserWorlds/ILoadUserWorldsUseCase";
import { useEffect } from "react";

export default function WorldSelection() {
  const loadUserWorldsUseCase = useInjection<ILoadUserWorldsUseCase>(
    USECASE_TYPES.ILoadUserWorldsUseCase
  );
  const [viewModel, controller] = useBuilder<
    WorldSelectionViewModel,
    IWorldSelectionController
  >(BUILDER_TYPES.IWorldSelectionBuilder);

  useEffect(() => {
    // call load user worlds use case to get relevant data
    const loadUserWorldsAsync = async (): Promise<void> => {
      await loadUserWorldsUseCase.executeAsync();
    };
    if (viewModel) loadUserWorldsAsync();
  }, [viewModel]);

  const [worlds] = useObservable<WorldSelectionWorldData[]>(
    viewModel?.userWorlds
  );
  const [selectedRowID] = useObservable<number>(viewModel?.selectedRowID);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%] overflow-auto">
      {worlds?.map((world) => {
        let worldIcon: string;
        if (world.isCompleted) worldIcon = worldSolved;
        else worldIcon = worldAvailable;

        return (
          <li className="flex items-center" key={world.id}>
            <WorldSelectionRow
              icon={worldIcon}
              title={world.name}
              selected={selectedRowID === world.id}
              onClickCallback={() => controller.onWorldRowClicked(world.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
