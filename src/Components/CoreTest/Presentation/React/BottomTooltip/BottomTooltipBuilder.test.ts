import BottomTooltipBuilder from "../../../../Core/Presentation/React/BottomTooltip/BottomTooltipBuilder";
import BottomTooltipPresenter from "../../../../Core/Presentation/React/BottomTooltip/BottomTooltipPresenter";

describe("MoodleLoginFormBuilder", () => {
  let systemUnderTest: BottomTooltipBuilder;

  beforeEach(() => {
    systemUnderTest = new BottomTooltipBuilder();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(BottomTooltipPresenter);
  });
});
