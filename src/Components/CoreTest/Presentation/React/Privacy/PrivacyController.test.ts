import PrivacyViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyViewModel";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

// PrivacyController is tested indirectly through Privacy integration tests
// It's tightly coupled with CoreDIContainer for dependency injection
// Unit tests for the business logic (state management) are in PrivacyPresenter.test.ts

describe("PrivacyViewModel", () => {
  test("should initialize with default values", () => {
    const viewModel = new PrivacyViewModel();
    expect(viewModel.cookiesAccepted.Value).toBe(false);
  });

  test("should allow updating cookiesAccepted status", () => {
    const viewModel = new PrivacyViewModel();
    viewModel.cookiesAccepted.Value = true;
    expect(viewModel.cookiesAccepted.Value).toBe(true);
  });

  test("should toggle cookiesAccepted state", () => {
    const viewModel = new PrivacyViewModel();
    viewModel.cookiesAccepted.Value = true;
    expect(viewModel.cookiesAccepted.Value).toBe(true);

    viewModel.cookiesAccepted.Value = false;
    expect(viewModel.cookiesAccepted.Value).toBe(false);
  });
});
