import { useInjection } from "inversify-react";
import { useEffect } from "react";
import ILoadWorldUseCase from "../../../../Application/UseCases/LoadWorld/ILoadWorldUseCase";
import IGetCurrentUserLocationUseCase from "../../../../Application/UseCases/GetCurrentUserLocation/IGetCurrentUserLocationUseCase";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ISpaceSelectionController from "./ISpaceSelectionController";
import SpaceSelectionRow from "./SpaceSelectionRow";
import SpaceSelectionViewModel, {
  SpaceSelectionSpaceData,
} from "./SpaceSelectionViewModel";

// icons
import spaceSolved from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";

export default function SpaceSelectionList() {
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

  const [spaces] = useObservable<SpaceSelectionSpaceData[]>(viewModel?.spaces);
  const [selectedRowID] = useObservable<number>(viewModel?.selectedRowSpaceID);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%] overflow-auto">
      {spaces?.map((space) => {
        let spaceIcon: string;
        if (space.isCompleted) spaceIcon = spaceSolved;
        else if (space.isAvailable) spaceIcon = spaceAvailable;
        else spaceIcon = spaceLocked;

        return (
          <li
            className="flex items-center"
            key={space.id.toString() + space.name}
          >
            <SpaceSelectionRow
              icon={spaceIcon}
              locked={!space.isAvailable}
              spaceTitle={space.name}
              selected={selectedRowID === space.id}
              onClickCallback={() => controller.onSpaceRowClicked(space.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
