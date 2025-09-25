import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import SettingContentViewModel from "./SettingContentViewModel";
import SettingContentController from "./SettingContentController";
import ISettingContentPresenter from "./ISettingContentPresenter";
import SettingContentPresenter from "./SettingContentPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class SettingContentBuilder extends PresentationBuilder<
  SettingContentViewModel,
  SettingContentController,
  undefined,
  ISettingContentPresenter
> {
  constructor() {
    super(
      SettingContentViewModel,
      SettingContentController,
      undefined,
      SettingContentPresenter,
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ISettingsAdapter>>(
      PORT_TYPES.ISettingsPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
    CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).execute();
  }
}
