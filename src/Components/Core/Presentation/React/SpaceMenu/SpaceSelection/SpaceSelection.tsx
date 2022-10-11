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
    const loadWorldAsync = async (): Promise<void> => {
      await loadWorldUseCase.executeAsync();
      viewModel.spaceIDs.Value.forEach((id) =>
        calculateSpaceScoreUseCase.execute({ spaceId: id })
      );
    };
    loadWorldAsync();
  }, []);

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
