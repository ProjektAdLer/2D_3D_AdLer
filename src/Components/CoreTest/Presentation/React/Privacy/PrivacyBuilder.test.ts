import PrivacyBuilder from "../../../../Core/Presentation/React/Privacy/PrivacyBuilder";
import PrivacyViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyViewModel";
import PrivacyController from "../../../../Core/Presentation/React/Privacy/PrivacyController";
import PrivacyPresenter from "../../../../Core/Presentation/React/Privacy/PrivacyPresenter";

describe("PrivacyBuilder", () => {
  let systemUnderTest: PrivacyBuilder;

  beforeEach(() => {
    systemUnderTest = new PrivacyBuilder();
  });

  test("should build a PrivacyViewModel", () => {
    systemUnderTest.buildViewModel();
    const viewModel = systemUnderTest.getViewModel();

    expect(viewModel).toBeInstanceOf(PrivacyViewModel);
  });

  test("should build a PrivacyController", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const controller = systemUnderTest.getController();

    expect(controller).toBeInstanceOf(PrivacyController);
  });

  test("should build a PrivacyPresenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    const presenter = systemUnderTest.getPresenter();

    expect(presenter).toBeInstanceOf(PrivacyPresenter);
  });

  test("should build complete presentation with viewModel, controller, and presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    const viewModel = systemUnderTest.getViewModel();
    const controller = systemUnderTest.getController();
    const presenter = systemUnderTest.getPresenter();

    expect(viewModel).toBeInstanceOf(PrivacyViewModel);
    expect(controller).toBeInstanceOf(PrivacyController);
    expect(presenter).toBeInstanceOf(PrivacyPresenter);
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
