import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import BadgeOverviewModalBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/BadgeOverviewModalBuilder";
import IBadgeOverviewModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/IBadgeOverviewModalPresenter";

describe("BadgeOverviewModalBuilder", () => {
  let systemUnderTest: BadgeOverviewModalBuilder;

  beforeEach(() => {
    systemUnderTest = new BadgeOverviewModalBuilder();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.IBadgeOverviewModalPresenter),
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.IBadgeOverviewModalPresenter),
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBadgeOverviewModalPresenter,
    ).toConstantValue(mock<IBadgeOverviewModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
