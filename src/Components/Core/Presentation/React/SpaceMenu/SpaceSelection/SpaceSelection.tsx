import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
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
      viewModel.spaces.Value.forEach(([id]) =>
        calculateSpaceScoreUseCase.execute({ spaceId: id })
      );
    };
    loadWorldAsync();
  }, []);

  const [spaces] = useObservable<[number, string][]>(viewModel.spaces);
  const [spacesCompleted] = useObservable<[number, boolean][]>(
    viewModel.spacesCompleted
  );
  const [selectedRowID] = useObservable<number>(viewModel.selectedRowID);

  if (!viewModel || !controller) return null;

  return (
    <ul className="flex flex-col gap-4 w-[100%] overflow-auto">
      {spaces?.map(([id, name]) => {
        return (
          <li className="flex items-center" key={id.toString() + name}>
            <SpaceSelectionRow
              spaceTitle={
                spacesCompleted?.find((tuple) => tuple[0] === id)?.[1]
                  ? "[\u2713] " + name
                  : name
              }
              selected={selectedRowID === id}
              onClickCallback={() => controller.onSpaceRowClicked(id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
