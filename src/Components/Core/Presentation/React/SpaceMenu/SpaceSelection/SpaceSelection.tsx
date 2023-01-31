import { useInjection } from "inversify-react";
import { useEffect } from "react";
import ICalculateSpaceScoreUseCase from "src/Components/Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import ILoadWorldUseCase from "src/Components/Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ISpaceSelectionController from "./ISpaceSelectionController";
import SpaceSelectionRow from "./SpaceSelectionRow";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

import spaceSolved from "../../../../../../Assets/icons/17-1-solutionCheck/check-solution-icon_nobg.svg";
import spaceAvailable from "../../../../../../Assets/icons/27-1_lockOpen/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../Assets/icons/27_lockClosed/lock-icon-closed-nobg.svg";

export default function SpaceSelection() {
  const loadWorldUseCase = useInjection<ILoadWorldUseCase>(
    USECASE_TYPES.ILoadWorldUseCase
  );
  const calculateSpaceScoreUseCase = useInjection<ICalculateSpaceScoreUseCase>(
    USECASE_TYPES.ICalculateSpaceScore
  );

  const [viewModel, controller] = useBuilder<
    SpaceSelectionViewModel,
    ISpaceSelectionController
  >(BUILDER_TYPES.ISpaceSelectionBuilder);

  useEffect(() => {
    // call load world use case to get relevant data
    const loadWorldAsync = async (): Promise<void> => {
      await loadWorldUseCase.executeAsync();
      viewModel.spaces.Value.forEach(([id]) =>
        calculateSpaceScoreUseCase.execute(id)
      );
    };
    if (viewModel) loadWorldAsync();
  }, [viewModel]);

  const [spaces] = useObservable<[number, string, boolean, boolean][]>(
    viewModel?.spaces
  );
  const [selectedRowID] = useObservable<number>(viewModel?.selectedRowID);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%] overflow-auto">
      {spaces?.map((space) => {
        // spaces array elements by index:
        // 0 = id, 1 = name, 2 = isAvailable, 3 = isCompleted
        let spaceIcon: string;
        if (space[3]) spaceIcon = spaceSolved;
        else if (space[2]) spaceIcon = spaceAvailable;
        else spaceIcon = spaceLocked;

        return (
          <li
            className="flex items-center"
            key={space[0].toString() + space[1]}
          >
            <SpaceSelectionRow
              icon={spaceIcon}
              locked={!space[2]}
              spaceTitle={space[1]}
              selected={selectedRowID === space[0]}
              onClickCallback={() => controller.onSpaceRowClicked(space[0])}
            />
          </li>
        );
      })}
    </ul>
  );
}
