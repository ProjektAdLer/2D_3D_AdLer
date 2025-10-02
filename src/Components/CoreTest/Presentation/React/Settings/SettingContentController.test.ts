import SettingContentController from "../../../../Core/Presentation/React/Settings/SettingContentController";
import SettingContentViewModel from "../../../../Core/Presentation/React/Settings/SettingContentViewModel";

describe("SettingContentController", () => {
  let systemUnderTest: SettingContentController;
  let viewModelMock = new SettingContentViewModel();
  beforeEach(() => {
    systemUnderTest = new SettingContentController(viewModelMock);
  });
  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });
  test("onBreakTimeNotificationsButtonClicked toggles breakTimeNotificationsEnabled in view model", () => {
    viewModelMock.breakTimeNotificationsEnabled.Value = false;
    systemUnderTest.onBreakTimeNotificationsButtonClicked();
    expect(viewModelMock.breakTimeNotificationsEnabled.Value).toBe(true);
    expect(viewModelMock.changedSettings).toBe(true);
    systemUnderTest.onBreakTimeNotificationsButtonClicked();
    expect(viewModelMock.breakTimeNotificationsEnabled.Value).toBe(false);
    expect(viewModelMock.changedSettings).toBe(true);
  });
  test("onGraphicsQualityButtonClicked toggles highGraphicsQualityEnabled in view model", () => {
    viewModelMock.highGraphicsQualityEnabled.Value = false;
    systemUnderTest.onGraphicsQualityButtonClicked();
    expect(viewModelMock.highGraphicsQualityEnabled.Value).toBe(true);
    expect(viewModelMock.changedSettings).toBe(true);
    systemUnderTest.onGraphicsQualityButtonClicked();
    expect(viewModelMock.highGraphicsQualityEnabled.Value).toBe(false);
    expect(viewModelMock.changedSettings).toBe(true);
  });
  test("onGermanButtonClicked sets language in view model", () => {
    viewModelMock.language.Value = "en";
    systemUnderTest.onGermanButtonClicked();
    expect(viewModelMock.language.Value).toBe("de");
    expect(viewModelMock.changedSettings).toBe(true);
  });
  test("onEnglishButtonClicked sets language in view model", () => {
    viewModelMock.language.Value = "de";
    systemUnderTest.onEnglishButtonClicked();
    expect(viewModelMock.language.Value).toBe("en");
    expect(viewModelMock.changedSettings).toBe(true);
  });
  test("onVolumeChange sets volume in view model", () => {
    viewModelMock.volume.Value = 50;
    systemUnderTest.onVolumeChange(80);
    expect(viewModelMock.volume.Value).toBe(80);
    expect(viewModelMock.changedSettings).toBe(true);
  });
});
