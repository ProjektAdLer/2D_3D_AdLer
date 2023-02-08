import IBottomTooltipPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import BottomTooltipPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipPresenter";
import ScorePanelViewModel from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipViewModel";

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

  test("should set the Text of Panel and show it", () => {
    systemUnderTest.displayElementSummaryTooltip({
      id: 1,
      name: "Test",
      elementData: {
        type: "text",
      },
    });
    expect(vm.text.Value).toBe("Test");
    expect(vm.show.Value).toBe(true);
  });
  test("displayExitQueryTooltip should set text and type correctly ", () => {
    systemUnderTest.displayExitQueryTooltip();
    expect(vm.text.Value).toBe("Raum verlassen?");
    expect(vm.iconType.Value).toBe("notAnElement");
    expect(vm.show.Value).toBe(true);
  });
});
