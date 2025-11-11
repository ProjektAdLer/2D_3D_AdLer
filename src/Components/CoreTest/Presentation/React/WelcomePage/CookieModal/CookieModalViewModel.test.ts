import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";

describe("CookieModalViewModel", () => {
  let systemUnderTest: CookieModalViewModel;

  beforeEach(() => {
    systemUnderTest = new CookieModalViewModel();
  });

  test("should create an instance", () => {
    expect(systemUnderTest).toBeInstanceOf(CookieModalViewModel);
  });

  test("should be instantiable without parameters", () => {
    const viewModel = new CookieModalViewModel();
    expect(viewModel).toBeDefined();
  });

  test("cookieConsent should be initialized with null", () => {
    expect(systemUnderTest.cookieConsent.Value).toBeNull();
  });

  test("cookieConsent can be set to 'accepted'", () => {
    systemUnderTest.cookieConsent.Value = "accepted";
    expect(systemUnderTest.cookieConsent.Value).toBe("accepted");
  });

  test("cookieConsent can be set to 'declined'", () => {
    systemUnderTest.cookieConsent.Value = "declined";
    expect(systemUnderTest.cookieConsent.Value).toBe("declined");
  });
});
