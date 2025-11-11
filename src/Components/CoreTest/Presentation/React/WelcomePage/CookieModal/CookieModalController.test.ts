import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "../../../../../Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";

describe("CookieModalController", () => {
  let systemUnderTest: CookieModalController;
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
    systemUnderTest = new CookieModalController(
      setSettingsConfigUseCase,
      getSettingsConfigUseCase,
    );
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
