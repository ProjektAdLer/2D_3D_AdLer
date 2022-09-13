import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ILearningRoomSelectionController from "./ILearningRoomSelectionController";
import LearningRoomSelectionRow from "./LearningRoomSelectionRow";
import LearningRoomSelectionViewModel from "./LearningRoomSelectionViewModel";

export default function LearningRoomSelection() {
  const [viewModel, controller] = useBuilder<
    LearningRoomSelectionViewModel,
    ILearningRoomSelectionController
  >(BUILDER_TYPES.ILearningRoomSelectionBuilder);

  const [learningRoomTitles] = useObservable<string[]>(
    viewModel?.learningRoomTitles
  );

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%]">
      {learningRoomTitles?.map((title, index) => (
        <li className="flex items-center" key={index}>
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
