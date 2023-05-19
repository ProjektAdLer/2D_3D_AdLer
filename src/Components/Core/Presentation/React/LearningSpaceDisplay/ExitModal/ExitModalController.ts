import type { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IExitModalController from "./IExitModalController";
import history from "history/browser";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import ExitModalViewModel from "./ExitModalViewModel";

export default class ExitModalController implements IExitModalController {
  private loadLearningSpaceUseCase: ILoadLearningSpaceUseCase;
  private getUserLocation: IGetUserLocationUseCase;
  constructor(private viewModel: ExitModalViewModel) {
    this.loadLearningSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    );
    this.getUserLocation = CoreDIContainer.get(
      USECASE_TYPES.IGetUserLocationUseCase
    );
  }
  onExitButtonClicked(): void {
    history.back();
  }

  @bind
  onSuccessorSpaceClicked(id: ComponentID): void {
    const userLocation = this.getUserLocation.execute();
    this.loadLearningSpaceUseCase.executeAsync({
      spaceID: id,
      worldID: userLocation.worldID!,
    });
    history.push("/spacedisplay/" + id);
    this.viewModel.isOpen.Value = false;
  }
}
