import IBottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import BottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipPresenter";
import BottomTooltipViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipViewModel";
import Observable from "../../../../../../Lib/Observable";
import { LearningElementTypes } from "../../../../../Core/Domain/Types/LearningElementTypes";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import PointBasedDisplay from "../../../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";

describe("BottomTooltipPresenter", () => {
  let systemUnderTest: IBottomTooltipPresenter;
  let vm: BottomTooltipViewModel;

  beforeEach(() => {
    vm = new BottomTooltipViewModel();
    systemUnderTest = new BottomTooltipPresenter(vm);
  });

  test("hide should make the tooltip not show if the hidden tooltip was the only one", () => {
    const id = systemUnderTest.display("test", LearningElementTypes.text);
    expect(vm.show.Value).toBe(true);
    systemUnderTest.hide(id);
    expect(vm.show.Value).toBe(false);
  });

  test("display should set the value of the viewModel when called", () => {
    const text = "test";
    const iconType = LearningElementTypes.h5p;
    const points = 1;
    const xp = 10;
    const isRequired = true;
    const hasScored = new Observable<boolean>(true);
    const onClickCallback = () => {};

    systemUnderTest.display(
      text,
      iconType,
      {
        points: points,
        hasScored: hasScored,
        xp: xp,
        isRequired: isRequired,
      },
      onClickCallback,
    );

    expect(vm.show.Value).toBe(true);
    expect(vm.text.Value).toBe(text);
    expect(vm.iconType.Value).toBe(iconType);
    expect(vm.points.Value).toBe(points);
    expect(vm.hasScored).toBe(hasScored);
    expect(vm.hasScored.Value).toBe(true);
    expect(vm.onClickCallback.Value).toBe(onClickCallback);
    expect(vm.xp.Value).toBe(xp);
    expect(vm.isRequired.Value).toBe(isRequired);
  });

  test("display sets points to undefined when not provided in data", () => {
    const text = "test";
    const iconType = LearningElementTypes.image;
    const onClickCallback = () => {};

    systemUnderTest.display(text, iconType, { xp: 5 }, onClickCallback);

    expect(vm.points.Value).toBeUndefined();
  });

  test("display sets default hasScored (false Observable) if not provided", () => {
    systemUnderTest.display("test", LearningElementTypes.video);
    expect(vm.hasScored).toBeInstanceOf(Observable);
    expect(vm.hasScored.Value).toBe(false);
  });

  test("display sets default clickCallback if none is provided", () => {
    systemUnderTest.display("test", LearningElementTypes.pdf);
    expect(vm.onClickCallback.Value).toEqual(expect.any(Function));
  });

  test("hideAll sets show in viewModel to false", () => {
    vm.show.Value = true;
    systemUnderTest.hideAll();
    expect(vm.show.Value).toBe(false);
  });

  test("hide should show the previous tooltip if the hidden one was the latest", () => {
    systemUnderTest.display("tooltip1", LearningElementTypes.text);
    const id2 = systemUnderTest.display("tooltip2", LearningElementTypes.h5p);
    expect(vm.show.Value).toBe(true);
    expect(vm.text.Value).toBe("tooltip2");

    systemUnderTest.hide(id2);
    expect(vm.show.Value).toBe(true);
    expect(vm.text.Value).toBe("tooltip1");
  });

  test("hide should correctly remove a non-latest tooltip and keep showing the latest", () => {
    const id1 = systemUnderTest.display("tooltip1", LearningElementTypes.text);
    systemUnderTest.display("tooltip2", LearningElementTypes.h5p);
    expect(vm.text.Value).toBe("tooltip2");

    systemUnderTest.hide(id1);
    expect(vm.show.Value).toBe(true);
    expect(vm.text.Value).toBe("tooltip2");
    expect(systemUnderTest["dataQueue"].length).toBe(1);
    expect(systemUnderTest["dataQueue"][0].text).toBe("tooltip2");
  });

  test("hide should not change show state if tooltipId does not exist and queue is not empty", () => {
    systemUnderTest.display("test", LearningElementTypes.text);
    expect(vm.show.Value).toBe(true);
    systemUnderTest.hide(999); // Non-existent ID
    expect(vm.show.Value).toBe(true);
    expect(vm.text.Value).toBe("test");
  });

  test("hide should set show to false if tooltipId does not exist and queue is empty", () => {
    expect(vm.show.Value).toBe(false);
    systemUnderTest.hide(999); // Non-existent ID
    expect(vm.show.Value).toBe(false);
  });

  test("show sets show in viewModel to false, if dataQueue is empty", () => {
    systemUnderTest.show();
    expect(vm.show.Value).toBe(false);
  });

  test("show sets show in viewModel to true, if a tooltip exists in dataQueue", () => {
    systemUnderTest.display("test", LearningElementTypes.text);
    systemUnderTest.show();
    expect(vm.show.Value).toBe(true);
  });

  test("should clear queue if onLearningSpaceLoaded was called", () => {
    const text = "test";
    const iconType = LearningElementTypes.video;
    const points = 1;
    const onClickCallback = () => {};
    systemUnderTest.display(text, iconType, { points }, onClickCallback);
    systemUnderTest.onLearningSpaceLoaded({
      gradingStyle: new PointBasedDisplay(),
    } as LearningSpaceTO);

    expect(systemUnderTest["dataQueue"].length).toBe(0);
    expect(vm.show.Value).toBe(false);
  });
});
