import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";

describe("CookieModalController", () => {
  let systemUnderTest: CookieModalController;
  let viewModel: CookieModalViewModel;
  let setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  beforeEach(() => {
    localStorage.clear();
    viewModel = new CookieModalViewModel();
    setSettingsConfigUseCase = CoreDIContainer.get<ISetSettingsConfigUseCase>(
      USECASE_TYPES.ISetSettingsConfigUseCase,
    );
    systemUnderTest = new CookieModalController(viewModel);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("accept", () => {
    test("should call setSettingsConfigUseCase with 'accepted'", () => {
      const executeSpy = jest.spyOn(setSettingsConfigUseCase, "execute");

      systemUnderTest.accept();

      expect(executeSpy).toHaveBeenCalledWith({ cookieConsent: "accepted" });
    });
  });

  describe("decline", () => {
    test("should call setSettingsConfigUseCase with 'declined'", () => {
      const executeSpy = jest.spyOn(setSettingsConfigUseCase, "execute");

      systemUnderTest.decline();

      expect(executeSpy).toHaveBeenCalledWith({ cookieConsent: "declined" });
    });
  });
});
