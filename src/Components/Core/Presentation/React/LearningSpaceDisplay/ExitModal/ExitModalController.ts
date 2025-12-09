import type { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IExitModalController from "./IExitModalController";
import history from "~ReactEntryPoint/history";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import ExitModalViewModel from "./ExitModalViewModel";
import ISetUserLocationUseCase from "src/Components/Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";

export default class ExitModalController implements IExitModalController {
  private getUserLocation: IGetUserLocationUseCase;
  private setUserLocation: ISetUserLocationUseCase;

  constructor(private viewModel: ExitModalViewModel) {
    this.getUserLocation = CoreDIContainer.get(
      USECASE_TYPES.IGetUserLocationUseCase,
    );
    this.setUserLocation = CoreDIContainer.get(
      USECASE_TYPES.ISetUserLocationUseCase,
    );
  }

  onExitButtonClicked(): void {
    history.push("/spacemenu");
  }

  @bind
  onPrecursorOrSuccessorSpaceClicked(id: ComponentID): void {
    const userLocation = this.getUserLocation.execute();
    this.setUserLocation.execute({
      spaceID: id,
      worldID: userLocation.worldID!,
    });
    history.push("/spacedisplay/" + id);
    this.viewModel.isOpen.Value = false;
  }
}
