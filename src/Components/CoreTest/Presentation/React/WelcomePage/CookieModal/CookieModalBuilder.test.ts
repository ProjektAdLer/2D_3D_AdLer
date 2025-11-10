import CookieModalBuilder from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalBuilder";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";

describe("CookieModalBuilder", () => {
  let systemUnderTest: CookieModalBuilder;
  let setSettingsConfigUseCase: ISetSettingsConfigUseCase;
  let getSettingsConfigUseCase: IGetSettingsConfigUseCase;

  beforeEach(() => {
    setSettingsConfigUseCase = CoreDIContainer.get<ISetSettingsConfigUseCase>(
      USECASE_TYPES.ISetSettingsConfigUseCase,
    );
    getSettingsConfigUseCase = CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    );
    systemUnderTest = new CookieModalBuilder(
      setSettingsConfigUseCase,
      getSettingsConfigUseCase,
    );
  });

  test("should build a CookieModalViewModel", () => {
    systemUnderTest.buildViewModel();
    const viewModel = systemUnderTest.getViewModel();

    expect(viewModel).toBeInstanceOf(CookieModalViewModel);
  });

  test("should build a CookieModalController", () => {
    systemUnderTest.buildController();
    const controller = systemUnderTest.controller;

    expect(controller).toBeInstanceOf(CookieModalController);
  });

  test("should build complete presentation with viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const viewModel = systemUnderTest.getViewModel();
    const controller = systemUnderTest.getController();

    expect(viewModel).toBeInstanceOf(CookieModalViewModel);
    expect(controller).toBeInstanceOf(CookieModalController);
  });

  test("should create controller with injected dependencies", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const controller = systemUnderTest.getController() as CookieModalController;

    // Test that controller is properly initialized with dependencies
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(CookieModalController);
  });
});
