import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ILearningWorldSelectionController from "./ILearningWorldSelectionController";
import LearningWorldSelectionRow from "./LearningWorldSelectionRow";
import LearningWorldSelectionViewModel, {
  LearningWorldSelectionLearningWorldData,
} from "./LearningWorldSelectionViewModel";

import worldSolved from "../../../../../../Assets/icons/14-1-world-completed/world-completed-icon-nobg.svg";
import worldAvailable from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useInjection } from "inversify-react";
import ILoadUserLearningWorldsUseCase from "src/Components/Core/Application/UseCases/LoadUserLearningWorlds/ILoadUserLearningWorldsUseCase";
import { useEffect } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function LearningWorldSelection({
  className,
}: AdLerUIComponent) {
  const loadUserWorldsUseCase = useInjection<ILoadUserLearningWorldsUseCase>(
    USECASE_TYPES.ILoadUserLearningWorldsUseCase
  );
  const [viewModel, controller] = useBuilder<
    LearningWorldSelectionViewModel,
    ILearningWorldSelectionController
  >(BUILDER_TYPES.ILearningWorldSelectionBuilder);

  useEffect(() => {
    // call load user worlds use case to get relevant data
    const loadUserLearningWorldsAsync = async (): Promise<void> => {
      await loadUserWorldsUseCase.executeAsync();
    };
    if (viewModel) loadUserLearningWorldsAsync();
  }, [viewModel, loadUserWorldsUseCase]);

  const [worlds] = useObservable<LearningWorldSelectionLearningWorldData[]>(
    viewModel?.userWorlds
  );
  const [selectedRowID] = useObservable<number>(viewModel?.selectedRowID);

  if (!viewModel || !controller) return null;

  return (
    <div className={tailwindMerge(className, "overflow-auto")}>
      <ul className="flex flex-col w-full gap-4">
        {worlds?.map((world) => {
          let worldIcon: string;
          if (world.isCompleted) worldIcon = worldSolved;
          else worldIcon = worldAvailable;

          return (
            <li className="flex items-center" key={world.id}>
              <LearningWorldSelectionRow
                icon={worldIcon}
                title={world.name}
                selected={selectedRowID === world.id}
                onClickCallback={() =>
                  controller.onLearningWorldRowClicked(world.id)
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}