import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import SettingContentPresenter from "../../../../Core/Presentation/React/Settings/SettingContentPresenter";
import SettingContentViewModel from "../../../../Core/Presentation/React/Settings/SettingContentViewModel";
import IGetSettingsConfigUseCase from "../../../../Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";

const getSettingsConfigUseCaseMock = mock<IGetSettingsConfigUseCase>();
describe("SettingContentPresenter", () => {
  let systemUnderTest: SettingContentPresenter;
  let viewModel = new SettingContentViewModel();
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).toConstantValue(getSettingsConfigUseCaseMock);
  });

  beforeEach(() => {
    viewModel.breakTimeNotificationsEnabled.Value = false;
    viewModel.highGraphicsQualityEnabled.Value = false;
    viewModel.language.Value = "de";
    viewModel.volume.Value = 20;
    systemUnderTest = new SettingContentPresenter(viewModel);
  });
  test("onSettingsUpdated should update view model", () => {
    systemUnderTest.onSettingsUpdated({
      breakTimeNotificationsEnabled: true,
      highGraphicsQualityEnabled: true,
      language: "en",
      volume: 80,
    });
    expect(viewModel.breakTimeNotificationsEnabled.Value).toBe(true);
    expect(viewModel.highGraphicsQualityEnabled.Value).toBe(true);
    expect(viewModel.language.Value).toBe("en");
    expect(viewModel.volume.Value).toBe(80);
  });
});
