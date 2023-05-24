import type { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IExitModalController from "./IExitModalController";
import history from "history/browser";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import ExitModalViewModel from "./ExitModalViewModel";
import ISetUserLocationUseCase from "src/Components/Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";

export default class ExitModalController implements IExitModalController {
  private loadLearningSpaceUseCase: ILoadLearningSpaceUseCase;
  private getUserLocation: IGetUserLocationUseCase;
  private setUserLocation: ISetUserLocationUseCase;
  constructor(private viewModel: ExitModalViewModel) {
    this.loadLearningSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    );
    this.getUserLocation = CoreDIContainer.get(
      USECASE_TYPES.IGetUserLocationUseCase
    );
    this.setUserLocation = CoreDIContainer.get(
      USECASE_TYPES.ISetUserLocationUseCase
    );
  }
  onExitButtonClicked(): void {
    history.back();
  }

  @bind
  onSuccessorSpaceClicked(id: ComponentID): void {
    const userLocation = this.getUserLocation.execute();
    this.setUserLocation.execute({
      spaceID: id,
      worldID: userLocation.worldID!,
    });
    history.push("/spacedisplay/" + id);
    this.viewModel.isOpen.Value = false;
  }
}
