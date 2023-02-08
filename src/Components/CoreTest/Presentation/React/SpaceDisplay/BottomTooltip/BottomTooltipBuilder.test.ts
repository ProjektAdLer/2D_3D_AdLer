import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import BottomTooltipBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

describe("BottomTooltipBuilder", () => {
  let systemUnderTest: BottomTooltipBuilder;

  beforeEach(() => {
    systemUnderTest = new BottomTooltipBuilder();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.IBottomTooltipPresenter)
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.IBottomTooltipPresenter)
    ).toBe(systemUnderTest.getPresenter()!);
  });
});
