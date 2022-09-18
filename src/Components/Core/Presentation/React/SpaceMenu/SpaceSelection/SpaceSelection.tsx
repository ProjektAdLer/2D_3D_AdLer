import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ISpaceSelectionController from "./ISpaceSelectionController";
import SpaceSelectionRow from "./SpaceSelectionRow";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

export default function SpaceSelection() {
  const [viewModel, controller] = useBuilder<
    SpaceSelectionViewModel,
    ISpaceSelectionController
  >(BUILDER_TYPES.ISpaceSelectionBuilder);

  const [spaceTitles] = useObservable<string[]>(viewModel?.spaceTitles);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%]">
      {spaceTitles?.map((title, index) => (
        <li className="flex items-center" key={index}>
          <SpaceSelectionRow
            spaceTitle={title}
            onClickCallback={() =>
              controller.onSpaceRowClicked(viewModel.spaceIDs.Value[index])
            }
          />
        </li>
      ))}
    </ul>
  );
}
