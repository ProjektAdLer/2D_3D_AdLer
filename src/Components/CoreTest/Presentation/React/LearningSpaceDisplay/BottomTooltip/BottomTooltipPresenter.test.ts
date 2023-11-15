import IBottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import BottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipPresenter";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipViewModel";

describe("BottomTooltipPresenter", () => {
  let systemUnderTest: IBottomTooltipPresenter;
  const vm = new ScorePanelViewModel();
  beforeEach(() => {
    systemUnderTest = new BottomTooltipPresenter(vm);
  });

  test("should set the value of the viewModel when hide is called", () => {
    vm.show.Value = true;
    systemUnderTest.hide();
    expect(vm.show.Value).toBe(false);
  });

  test("display should set the value of the viewModel when called", () => {
    const text = "test";
    const iconType = "test";
    const points = 1;
    const onClickCallback = () => {};

    systemUnderTest.display(text, iconType, points, onClickCallback);

    expect(vm.show.Value).toBe(true);
    expect(vm.text.Value).toBe(text);
    expect(vm.iconType.Value).toBe(iconType);
    expect(vm.points.Value).toBe(points);
    expect(vm.showPoints.Value).toBe(true);
    expect(vm.onClickCallback.Value).toBe(onClickCallback);
  });

  test("display sets showPoints to false when points is undefined", () => {
    const text = "test";
    const iconType = "test";
    const onClickCallback = () => {};

    systemUnderTest.display(text, iconType, undefined, onClickCallback);

    expect(vm.showPoints.Value).toBe(false);
  });
});
