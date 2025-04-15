import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import CinemaStripesBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/CinemaStripes/CinemaStripesBuilder";

describe("CinemaStripesBuilder", () => {
  let systemUnderTest: CinemaStripesBuilder;

  beforeEach(() => {
    systemUnderTest = new CinemaStripesBuilder();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.ICinemaStripesPresenter),
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.ICinemaStripesPresenter),
    ).toBe(systemUnderTest.getPresenter()!);
  });
});
