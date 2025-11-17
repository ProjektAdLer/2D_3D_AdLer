import PrivacyContentController from "../../../../Core/Presentation/React/Privacy/PrivacyContentController";
import PrivacyContentViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyContentViewModel";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "../../../../Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";

describe("PrivacyContentController", () => {
  let systemUnderTest: PrivacyContentController;
  let viewModel: PrivacyContentViewModel;
  let setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  beforeEach(() => {
    localStorage.clear();
    viewModel = new PrivacyContentViewModel();
    setSettingsConfigUseCase = CoreDIContainer.get<ISetSettingsConfigUseCase>(
      USECASE_TYPES.ISetSettingsConfigUseCase,
    );
    systemUnderTest = new PrivacyContentController(viewModel);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should call setSettingsConfigUseCase when setCookieConsent is called with true", () => {
    const executeSpy = jest.spyOn(setSettingsConfigUseCase, "execute");

    systemUnderTest.setCookieConsent(true);

    expect(executeSpy).toHaveBeenCalledWith({ cookieConsent: "accepted" });
  });

  test("should call setSettingsConfigUseCase when setCookieConsent is called with false", () => {
    const executeSpy = jest.spyOn(setSettingsConfigUseCase, "execute");

    systemUnderTest.setCookieConsent(false);

    expect(executeSpy).toHaveBeenCalledWith({ cookieConsent: "declined" });
  });

  test("should call use case correctly for multiple consent changes", () => {
    const executeSpy = jest.spyOn(setSettingsConfigUseCase, "execute");

    systemUnderTest.setCookieConsent(true);
    expect(executeSpy).toHaveBeenCalledWith({ cookieConsent: "accepted" });

    systemUnderTest.setCookieConsent(false);
    expect(executeSpy).toHaveBeenCalledWith({ cookieConsent: "declined" });

    expect(executeSpy).toHaveBeenCalledTimes(2);
  });
});
