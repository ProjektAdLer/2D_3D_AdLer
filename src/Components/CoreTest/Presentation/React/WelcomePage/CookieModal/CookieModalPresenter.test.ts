import CookieModalPresenter from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalPresenter";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";
import SettingsTO from "../../../../../Core/Application/DataTransferObjects/SettingsTO";

describe("CookieModalPresenter", () => {
  let systemUnderTest: CookieModalPresenter;
  let viewModel: CookieModalViewModel;

  beforeEach(() => {
    viewModel = new CookieModalViewModel();
    systemUnderTest = new CookieModalPresenter(viewModel);
  });

  test("should create an instance", () => {
    expect(systemUnderTest).toBeInstanceOf(CookieModalPresenter);
  });

  test("should update viewModel when onSettingsUpdated is called with 'accepted'", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";

    systemUnderTest.onSettingsUpdated(settings);

    expect(viewModel.cookieConsent.Value).toBe("accepted");
  });

  test("should update viewModel when onSettingsUpdated is called with 'declined'", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "declined";

    systemUnderTest.onSettingsUpdated(settings);

    expect(viewModel.cookieConsent.Value).toBe("declined");
  });

  test("should not update viewModel when cookieConsent is undefined", () => {
    viewModel.cookieConsent.Value = "accepted";
    const settings = new SettingsTO();
    // cookieConsent is undefined

    systemUnderTest.onSettingsUpdated(settings);

    // Should remain unchanged
    expect(viewModel.cookieConsent.Value).toBe("accepted");
  });
});
