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
});
