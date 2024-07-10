import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import ILearningSpaceSelectionController from "../ILearningSpaceSelectionController";
import LearningSpaceSelectionRow from "./LearningSpaceSelectionRow";
import LearningSpaceSelectionViewModel, {
  LearningSpaceSelectionLearningSpaceData,
} from "../LearningSpaceSelectionViewModel";

// icons
import spaceSolved from "../../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";
import { useCallback } from "react";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default function LearningSpaceSelectionList(props: {
  controller: ILearningSpaceSelectionController;
  viewModel: LearningSpaceSelectionViewModel;
}) {
  const [spaces] = useObservable<LearningSpaceSelectionLearningSpaceData[]>(
    props.viewModel.spaces
  );
  const [selectedRowID] = useObservable<number>(
    props.viewModel.selectedSpaceID
  );
  const onRowClicked = useCallback(
    (id: ComponentID) => props.controller.onLearningSpaceClicked(id),
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
            <LearningSpaceSelectionRow
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
