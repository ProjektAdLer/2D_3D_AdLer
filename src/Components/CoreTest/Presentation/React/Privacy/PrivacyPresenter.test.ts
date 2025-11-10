import PrivacyPresenter from "../../../../Core/Presentation/React/Privacy/PrivacyPresenter";
import PrivacyViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyViewModel";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

describe("PrivacyPresenter", () => {
  let presenter: PrivacyPresenter;
  let viewModel: PrivacyViewModel;

  beforeEach(() => {
    viewModel = new PrivacyViewModel();
    presenter = new PrivacyPresenter(viewModel);
  });

  test("should update viewModel when settings are updated with accepted consent", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";

    presenter.onSettingsUpdated(settings);

    expect(viewModel.cookiesAccepted.Value).toBe(true);
  });

  test("should update viewModel when settings are updated with declined consent", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "declined";

    presenter.onSettingsUpdated(settings);

    expect(viewModel.cookiesAccepted.Value).toBe(false);
  });

  test("should not change viewModel when cookieConsent is undefined", () => {
    viewModel.cookiesAccepted.Value = true;

    const settings = new SettingsTO();
    settings.cookieConsent = undefined;

    presenter.onSettingsUpdated(settings);

    expect(viewModel.cookiesAccepted.Value).toBe(true);
  });

  test("should handle toggle from accepted to declined", () => {
    const acceptedSettings = new SettingsTO();
    acceptedSettings.cookieConsent = "accepted";
    presenter.onSettingsUpdated(acceptedSettings);
    expect(viewModel.cookiesAccepted.Value).toBe(true);

    const declinedSettings = new SettingsTO();
    declinedSettings.cookieConsent = "declined";
    presenter.onSettingsUpdated(declinedSettings);
    expect(viewModel.cookiesAccepted.Value).toBe(false);
  });

  test("should ignore other settings in SettingsTO", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";
    settings.volume = 100;
    settings.language = "de";

    presenter.onSettingsUpdated(settings);

    expect(viewModel.cookiesAccepted.Value).toBe(true);
    // Only cookieConsent should be processed
  });
});
