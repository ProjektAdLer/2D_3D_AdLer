import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import ILearningWorldSelectionController from "./ILearningWorldSelectionController";
import LearningWorldSelectionRow from "./LearningWorldSelectionRow";
import LearningWorldSelectionViewModel, {
  LearningWorldSelectionLearningWorldData,
} from "./LearningWorldSelectionViewModel";

import worldSolved from "../../../../../../Assets/icons/14-1-world-completed/world-completed-icon-nobg.svg";
import worldAvailable from "../../../../../../Assets/icons/world.svg";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import ILoadUserLearningWorldsInfoUseCase from "src/Components/Core/Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";
import ILoadingScreenPresenter from "~ReactComponents/GeneralComponents/LoadingScreen/ILoadingScreenPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import { useTranslation } from "react-i18next";

export default function LearningWorldSelection({
  className,
}: AdLerUIComponent) {
  const loadUserWorldsInfoUseCase =
    useInjection<ILoadUserLearningWorldsInfoUseCase>(
      USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase,
    );
  const loadingScreenPresenter = useInjection<ILoadingScreenPresenter>(
    PRESENTATION_TYPES.ILoadingScreenPresenter,
  );

  const [viewModel, controller] = useBuilder<
    LearningWorldSelectionViewModel,
    ILearningWorldSelectionController
  >(BUILDER_TYPES.ILearningWorldSelectionBuilder);

  const { t: translate } = useTranslation("worldMenu");

  useEffect(() => {
    // call load user worlds use case to get relevant data
    const loadUserLearningWorldsInfoAsync = async (): Promise<void> => {
      await loadUserWorldsInfoUseCase.executeAsync();
      loadingScreenPresenter.releaseLoadingLock();
      loadingScreenPresenter.closeLoadingScreen();
    };
    if (viewModel) {
      loadingScreenPresenter.lockLoadingLock();
      loadingScreenPresenter.showLoadingScreen();
      loadingScreenPresenter.pushLoadStep(
        translate("loadLearningWorldOverview"),
      );
      loadUserLearningWorldsInfoAsync();
    }
  }, [viewModel, loadUserWorldsInfoUseCase, translate, loadingScreenPresenter]);

  const [worlds] = useObservable<LearningWorldSelectionLearningWorldData[]>(
    viewModel?.userWorlds,
  );
  const [newData] = useObservable<boolean>(viewModel?.newData);
  useEffect(() => {
    if (viewModel) viewModel.newData.Value = false;
  }, [newData, viewModel]);
  const [selectedWorldID] = useObservable<number>(viewModel?.selectedWorldID);

  if (!viewModel || !controller) return null;

  return (
    <div className={tailwindMerge(className, "overflow-auto")}>
      <ul className="flex flex-col w-full gap-4">
        {worlds?.map((world) => {
          let worldIcon: string;
          if (world.isCompleted) worldIcon = worldSolved;
          else worldIcon = worldAvailable;

          return (
            <li className="flex items-center" key={world.id}>
              <LearningWorldSelectionRow
                icon={worldIcon}
                title={world.name}
                selected={selectedWorldID === world.id}
                onClickCallback={() =>
                  controller.onLearningWorldRowClicked(world.id)
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
