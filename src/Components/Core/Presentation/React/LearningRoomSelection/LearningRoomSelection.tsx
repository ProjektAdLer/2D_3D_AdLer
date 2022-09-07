import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "../CustomHooks/useBuilder";
import LearningRoomSelectionController from "./LearningRoomSelectionController";
import LearningRoomSelectionRow from "./LearningRoomSelectionRow";
import LearningRoomSelectionViewModel from "./LearningRoomSelectionViewModel";

export default function LearningRoomSelection() {
  const [viewModel, controller] = useBuilder<
    LearningRoomSelectionViewModel,
    LearningRoomSelectionController
  >(BUILDER_TYPES.ILearningRoomSelectionBuilder);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col justify-center gap-4">
      {viewModel.learningRoomTitles.Value.map((title, index) => (
        <li key={title}>
          <LearningRoomSelectionRow
            learningRoomTitle={title}
            onClickCallback={() =>
              controller.onLearningRoomRowClicked(
                viewModel.learningRoomIDs.Value[index]
              )
            }
          />
        </li>
      ))}
    </ul>
  );
}
