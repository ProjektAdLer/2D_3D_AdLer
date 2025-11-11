import CookieModalBuilder from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalBuilder";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";
import CookieModalPresenter from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalPresenter";

describe("CookieModalBuilder", () => {
  let systemUnderTest: CookieModalBuilder;
  let setSettingsConfigUseCase: ISetSettingsConfigUseCase;
  let getSettingsConfigUseCase: IGetSettingsConfigUseCase;

  beforeEach(() => {
    localStorage.clear();
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

  afterEach(() => {
    localStorage.clear();
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

  test("should build a CookieModalPresenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    const presenter = systemUnderTest.presenter;

    expect(presenter).toBeInstanceOf(CookieModalPresenter);
  });

  test("should build complete presentation with viewModel, controller, and presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();
    const viewModel = systemUnderTest.getViewModel();
    const controller = systemUnderTest.getController();
    const presenter = systemUnderTest.presenter;

    expect(viewModel).toBeInstanceOf(CookieModalViewModel);
    expect(controller).toBeInstanceOf(CookieModalController);
    expect(presenter).toBeInstanceOf(CookieModalPresenter);
  });

  test("should initialize ViewModel with null when no cookieConsent in settings", () => {
    systemUnderTest.buildViewModel();
    const viewModel = systemUnderTest.getViewModel();

    expect(viewModel?.cookieConsent.Value).toBeNull();
  });

  test("should initialize ViewModel with cookieConsent from settings when value exists", () => {
    // Set a value in settings first
    setSettingsConfigUseCase.execute({ cookieConsent: "accepted" });

    // Create new builder instance to ensure clean state
    const newBuilder = new CookieModalBuilder(
      setSettingsConfigUseCase,
      getSettingsConfigUseCase,
    );
    newBuilder.buildViewModel();
    const viewModel = newBuilder.getViewModel();

    expect(viewModel?.cookieConsent.Value).toBe("accepted");
  });

  test("should update ViewModel when controller calls accept (full integration)", () => {
    // Explicitly clear settings before test
    localStorage.clear();

    // Create fresh builder
    const freshBuilder = new CookieModalBuilder(
      setSettingsConfigUseCase,
      getSettingsConfigUseCase,
    );

    // Build complete presentation
    freshBuilder.buildViewModel();
    freshBuilder.buildController();
    freshBuilder.buildPresenter();

    const viewModel = freshBuilder.getViewModel();
    const controller = freshBuilder.getController();

    // Get initial value (may not be null due to test pollution)
    const initialValue = viewModel?.cookieConsent.Value;

    // Controller accepts
    controller?.accept();

    // ViewModel should be updated to "accepted" through Presenter
    expect(viewModel?.cookieConsent.Value).toBe("accepted");
    // And it should be different from or same as initial if it was already accepted
    if (initialValue !== "accepted") {
      expect(viewModel?.cookieConsent.Value).not.toBe(initialValue);
    }
  });

  test("should update ViewModel when controller calls decline (full integration)", () => {
    // Explicitly clear settings before test
    localStorage.clear();

    // Create fresh builder
    const freshBuilder = new CookieModalBuilder(
      setSettingsConfigUseCase,
      getSettingsConfigUseCase,
    );

    // Build complete presentation
    freshBuilder.buildViewModel();
    freshBuilder.buildController();
    freshBuilder.buildPresenter();

    const viewModel = freshBuilder.getViewModel();
    const controller = freshBuilder.getController();

    // Get initial value (may not be null due to test pollution)
    const initialValue = viewModel?.cookieConsent.Value;

    // Controller declines
    controller?.decline();

    // ViewModel should be updated to "declined" through Presenter
    expect(viewModel?.cookieConsent.Value).toBe("declined");
    // And it should be different from initial value (unless it was already declined)
    if (initialValue !== "declined") {
      expect(viewModel?.cookieConsent.Value).not.toBe(initialValue);
    }
  });
});
