import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import IRoomSelectionSectionController from "./IRoomSelectionSectionController";
import RoomSelectionSectionRow from "./RoomSelectionSectionRow";
import RoomSelectionSectionViewModel from "./RoomSelectionSectionViewModel";

export default function RoomSelectionSection() {
  const [viewModel, controller] = useBuilder<
    RoomSelectionSectionViewModel,
    IRoomSelectionSectionController
  >(BUILDER_TYPES.IRoomSelectionSectionBuilder);

  const [roomTitles] = useObservable<string[]>(viewModel?.roomTitles);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%]">
      {roomTitles?.map((title, index) => (
        <li className="flex items-center" key={index}>
          <RoomSelectionSectionRow
            roomTitle={title}
            onClickCallback={() =>
              controller.onRoomRowClicked(viewModel.roomIDs.Value[index])
            }
          />
        </li>
      ))}
    </ul>
  );
}
