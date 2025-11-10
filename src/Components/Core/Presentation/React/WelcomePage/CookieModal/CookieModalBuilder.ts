import { injectable, inject } from "inversify";
import CookieModalController from "./CookieModalController";
import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

@injectable()
export default class CookieModalBuilder extends PresentationBuilder<
  CookieModalViewModel,
  ICookieModalController,
  undefined,
  undefined
> {
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;
  private getSettingsConfigUseCase: IGetSettingsConfigUseCase;

  constructor(
    @inject(USECASE_TYPES.ISetSettingsConfigUseCase)
    setSettingsConfigUseCase: ISetSettingsConfigUseCase,
    @inject(USECASE_TYPES.IGetSettingsConfigUseCase)
    getSettingsConfigUseCase: IGetSettingsConfigUseCase,
  ) {
    super(CookieModalViewModel, undefined, undefined, undefined);
    this.setSettingsConfigUseCase = setSettingsConfigUseCase;
    this.getSettingsConfigUseCase = getSettingsConfigUseCase;
  }

  override buildController(): void {
    this.controller = new CookieModalController(
      this.setSettingsConfigUseCase,
      this.getSettingsConfigUseCase,
    );
  }
}
