import CookieModalBuilder from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalBuilder";
import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";
import CookieModalPresenter from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalPresenter";

describe("CookieModalBuilder", () => {
  let systemUnderTest: CookieModalBuilder;

  beforeEach(() => {
    localStorage.clear();
    systemUnderTest = new CookieModalBuilder();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should build a CookieModalViewModel", () => {
    systemUnderTest.buildViewModel();
    const viewModel = systemUnderTest.getViewModel();

    expect(viewModel).toBeInstanceOf(CookieModalViewModel);
  });

  test("should build a CookieModalController", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const controller = systemUnderTest.getController();

    expect(controller).toBeInstanceOf(CookieModalController);
  });

  test("should build a CookieModalPresenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    const presenter = systemUnderTest.getPresenter();

    expect(presenter).toBeInstanceOf(CookieModalPresenter);
  });

  test("should build complete presentation with viewModel, controller, and presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();
    const viewModel = systemUnderTest.getViewModel();
    const controller = systemUnderTest.getController();
    const presenter = systemUnderTest.getPresenter();

    expect(viewModel).toBeInstanceOf(CookieModalViewModel);
    expect(controller).toBeInstanceOf(CookieModalController);
    expect(presenter).toBeInstanceOf(CookieModalPresenter);
  });

  test("controller and presenter should be initialized with same viewModel", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    const viewModel = systemUnderTest.getViewModel();
    const controller = systemUnderTest.getController();
    const presenter = systemUnderTest.getPresenter();

    // Both controller and presenter should reference the same viewModel
    expect(controller["viewModel"]).toBe(viewModel);
    expect(presenter["viewModel"]).toBe(viewModel);
  });
});
