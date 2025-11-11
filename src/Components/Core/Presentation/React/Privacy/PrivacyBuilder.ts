import { injectable } from "inversify";
import PrivacyViewModel from "./PrivacyViewModel";
import PrivacyController from "./PrivacyController";
import IPrivacyController from "./IPrivacyController";
import PrivacyPresenter from "./PrivacyPresenter";
import IPrivacyPresenter from "./IPrivacyPresenter";
import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class PrivacyBuilder extends PresentationBuilder<
  PrivacyViewModel,
  IPrivacyController,
  undefined,
  IPrivacyPresenter
> {
  constructor() {
    super(PrivacyViewModel, PrivacyController, undefined, PrivacyPresenter);
  }

  override buildViewModel(): void {
    this.viewModel = new PrivacyViewModel();
  }

  override buildController(): void {
    this.controller = new PrivacyController(this.viewModel!);
  }

  override buildPresenter(): void {
    this.presenter = new PrivacyPresenter(this.viewModel!);
    CoreDIContainer.get<AbstractPort<ISettingsAdapter>>(
      PORT_TYPES.ISettingsPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
    CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).execute();
  }
}
