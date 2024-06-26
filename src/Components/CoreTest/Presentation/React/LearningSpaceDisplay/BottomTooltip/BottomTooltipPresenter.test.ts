import IBottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import BottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipPresenter";
import BottomTooltipViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipViewModel";

describe("BottomTooltipPresenter", () => {
  let systemUnderTest: IBottomTooltipPresenter;
  const vm = new BottomTooltipViewModel();

  beforeEach(() => {
    systemUnderTest = new BottomTooltipPresenter(vm);
  });

  test("should set the value of the viewModel when hide is called", () => {
    vm.show.Value = true;
    systemUnderTest.hide(1);
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

  test("display sets default clickCallback if none is provided", () => {
    systemUnderTest.display("test");
    expect(vm.onClickCallback.Value).toEqual(expect.any(Function));
  });

  test("hideAll sets show in viewModel to false", () => {
    vm.show.Value = true;
    systemUnderTest.hideAll();
    expect(vm.show.Value).toBe(false);
  });

  test("hide removes tooltip from vm", () => {
    systemUnderTest.display("test1");
    systemUnderTest.display("test2");
    systemUnderTest.hide(0);
    expect(systemUnderTest["dataQueue"].length).toBe(1);
    expect(systemUnderTest["dataQueue"][0].text).toBe("test2");
  });

  test("show sets show in viewModel to false, if no tooltip exists", () => {
    systemUnderTest.show();
    expect(vm.show.Value).toBe(false);
  });

  test("show sets show in viewModel to true, if tooltip exists", () => {
    systemUnderTest.display("test");
    systemUnderTest.show();
    expect(vm.show.Value).toBe(true);
  });
});
