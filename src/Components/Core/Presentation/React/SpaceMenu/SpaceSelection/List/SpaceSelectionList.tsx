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
              onClickCallback={() => props.controller.onSpaceClicked(space.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
