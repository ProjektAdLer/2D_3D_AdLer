import PrivacyContentBuilder from "../../../../Core/Presentation/React/Privacy/PrivacyContentBuilder";
import PrivacyContentViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyContentViewModel";
import PrivacyContentController from "../../../../Core/Presentation/React/Privacy/PrivacyContentController";
import PrivacyContentPresenter from "../../../../Core/Presentation/React/Privacy/PrivacyContentPresenter";

describe("PrivacyContentBuilder", () => {
  let systemUnderTest: PrivacyContentBuilder;

  beforeEach(() => {
    systemUnderTest = new PrivacyContentBuilder();
  });

  test("should build a PrivacyContentViewModel", () => {
    systemUnderTest.buildViewModel();
    const viewModel = systemUnderTest.getViewModel();

    expect(viewModel).toBeInstanceOf(PrivacyContentViewModel);
  });

  test("should build a PrivacyContentController", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const controller = systemUnderTest.getController();

    expect(controller).toBeInstanceOf(PrivacyContentController);
  });

  test("should build a PrivacyContentPresenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    const presenter = systemUnderTest.getPresenter();

    expect(presenter).toBeInstanceOf(PrivacyContentPresenter);
  });

  test("should build complete presentation with viewModel, controller, and presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    const viewModel = systemUnderTest.getViewModel();
    const controller = systemUnderTest.getController();
    const presenter = systemUnderTest.getPresenter();

    expect(viewModel).toBeInstanceOf(PrivacyContentViewModel);
    expect(controller).toBeInstanceOf(PrivacyContentController);
    expect(presenter).toBeInstanceOf(PrivacyContentPresenter);
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
