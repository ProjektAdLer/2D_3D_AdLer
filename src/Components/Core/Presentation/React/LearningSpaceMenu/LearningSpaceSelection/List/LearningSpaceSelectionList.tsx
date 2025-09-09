import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import ILearningSpaceSelectionController from "../ILearningSpaceSelectionController";
import LearningSpaceSelectionRow from "./LearningSpaceSelectionRow";
import LearningSpaceSelectionViewModel, {
  LearningSpaceSelectionLearningSpaceData,
} from "../LearningSpaceSelectionViewModel";

// icons
import spaceSolved from "../../../../../../../Assets/icons/check-solution.svg";
import spaceAvailable from "../../../../../../../Assets/icons/unlocked.svg";
import spaceLocked from "../../../../../../../Assets/icons/locked.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default function LearningSpaceSelectionList(props: {
  controller: ILearningSpaceSelectionController;
  viewModel: LearningSpaceSelectionViewModel;
}) {
  const [spaces] = useObservable<LearningSpaceSelectionLearningSpaceData[]>(
    props.viewModel.spaces,
  );
  const [selectedRowID] = useObservable<number>(
    props.viewModel.selectedSpaceID,
  );
  const onRowClicked = useCallback(
    (id: ComponentID) => props.controller.onLearningSpaceClicked(id),
    [props.controller],
  );
  const onRowDoubleClicked = useCallback(
    (id: ComponentID, isAvailable: boolean) =>
      props.controller.onLearningSpaceDoubleClicked(id, isAvailable),
    [props.controller],
  );

  const scrollTarget = useRef<HTMLLIElement>(null);
  const [firstTimeFocus, setFirstTimeFocus] = useState<boolean>(true);

  useEffect(() => {
    if (firstTimeFocus && scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ block: "nearest" });
      setFirstTimeFocus(false);
    }
  }, [selectedRowID, firstTimeFocus]);

  let spaceIcon: string;

  return (
    <ul className="flex w-full flex-col gap-4 p-2 pt-4 lg:p-8">
      {spaces?.map((space) => {
        if (space.isCompleted) spaceIcon = spaceSolved;
        else if (space.isAvailable) spaceIcon = spaceAvailable;
        else spaceIcon = spaceLocked;

        return (
          <li
            className="flex items-center"
            key={space.id.toString() + space.name}
            ref={space.id === selectedRowID ? scrollTarget : null}
          >
            <LearningSpaceSelectionRow
              icon={spaceIcon}
              locked={!space.isAvailable}
              spaceTitle={space.name}
              spaceId={space.id}
              selected={selectedRowID === space.id}
              onClickCallback={() => onRowClicked(space.id)}
              onDoubleClickCallback={() =>
                onRowDoubleClicked(space.id, space.isAvailable)
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
