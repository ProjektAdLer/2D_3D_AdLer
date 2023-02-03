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

export default function WorldSelection() {
  const [viewModel, controller] = useBuilder<
    WorldSelectionViewModel,
    IWorldSelectionController
  >(BUILDER_TYPES.IWorldSelectionBuilder);
  const [worlds] = useObservable<WorldSelectionWorldData[]>(viewModel?.worlds);
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
              title={world.title}
              selected={selectedRowID === world.id}
              onClickCallback={() => controller.onWorldRowClicked(world.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
