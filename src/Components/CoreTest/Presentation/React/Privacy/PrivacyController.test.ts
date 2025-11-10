import PrivacyController from "../../../../Core/Presentation/React/Privacy/PrivacyController";
import PrivacyViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyViewModel";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetSettingsConfigUseCase from "../../../../Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import type ISetSettingsConfigUseCase from "../../../../Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import SettingsTO from "../../../../Core/Application/DataTransferObjects/SettingsTO";

describe("PrivacyController", () => {
  let systemUnderTest: PrivacyController;
  let viewModel: PrivacyViewModel;
  let getSettingsConfigUseCase: IGetSettingsConfigUseCase;
  let setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  beforeEach(() => {
    localStorage.clear();
    viewModel = new PrivacyViewModel();
    getSettingsConfigUseCase = CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    );
    setSettingsConfigUseCase = CoreDIContainer.get<ISetSettingsConfigUseCase>(
      USECASE_TYPES.ISetSettingsConfigUseCase,
    );
    systemUnderTest = new PrivacyController(viewModel);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should initialize with cookiesAccepted as false when no consent is stored", () => {
    expect(viewModel.cookiesAccepted.Value).toBe(false);
  });

  test("should load cookieConsent from settings on initialization", () => {
    // The controller loads settings from the settings usecase, which reads from localStorage
    // Verify that the controller initializes with the current settings
    systemUnderTest.setCookieConsent(true);

    // Create a new controller - it should load the updated settings
    const newViewModel = new PrivacyViewModel();
    const newController = new PrivacyController(newViewModel);

    // The new controller should have initialized with the current consent status
    expect(newController["viewModel"].cookiesAccepted.Value).toBe(true);
  });

  test("getUserSettings should return current settings", () => {
    const settings = systemUnderTest.getUserSettings();
    expect(settings).toBeInstanceOf(SettingsTO);
  });

  test("setCookieConsent should set consent to accepted when true", () => {
    systemUnderTest.setCookieConsent(true);

    expect(viewModel.cookiesAccepted.Value).toBe(true);
    expect(localStorage.getItem("adler_cookie_consent")).toBe("accepted");
  });

  test("setCookieConsent should set consent to declined when false", () => {
    systemUnderTest.setCookieConsent(false);

    expect(viewModel.cookiesAccepted.Value).toBe(false);
    expect(localStorage.getItem("adler_cookie_consent")).toBe("declined");
  });

  test("setCookieConsent should toggle from accepted to declined", () => {
    systemUnderTest.setCookieConsent(true);
    expect(viewModel.cookiesAccepted.Value).toBe(true);

    systemUnderTest.setCookieConsent(false);
    expect(viewModel.cookiesAccepted.Value).toBe(false);
    expect(localStorage.getItem("adler_cookie_consent")).toBe("declined");
  });

  test("setCookieConsent should toggle from declined to accepted", () => {
    systemUnderTest.setCookieConsent(false);
    expect(viewModel.cookiesAccepted.Value).toBe(false);

    systemUnderTest.setCookieConsent(true);
    expect(viewModel.cookiesAccepted.Value).toBe(true);
    expect(localStorage.getItem("adler_cookie_consent")).toBe("accepted");
  });
});
