import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import ISpaceSelectionController from "../ISpaceSelectionController";
import SpaceSelectionRow from "./SpaceSelectionRow";
import SpaceSelectionViewModel, {
  SpaceSelectionSpaceData,
} from "../SpaceSelectionViewModel";

// icons
import spaceSolved from "../../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";
import { useCallback } from "react";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default function SpaceSelectionList(props: {
  controller: ISpaceSelectionController;
  viewModel: SpaceSelectionViewModel;
}) {
  const [spaces] = useObservable<SpaceSelectionSpaceData[]>(
    props.viewModel.spaces
  );
  const [selectedRowID] = useObservable<number>(
    props.viewModel.selectedRowSpaceID
  );
  const onRowClicked = useCallback(
    (id: ComponentID) => props.controller.onSpaceClicked(id),
    [props.controller]
  );
  let spaceIcon: string;

  return (
    <ul className="flex flex-col w-full gap-4 pt-4">
      {spaces?.map((space) => {
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
              onClickCallback={() => onRowClicked(space.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
