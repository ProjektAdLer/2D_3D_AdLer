import IBottomTooltipPresenter from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/BottomTooltip/IBottomTooltipPresenter";
import BottomTooltipPresenter from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/BottomTooltip/BottomTooltipPresenter";
import ScorePanelViewModel from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/BottomTooltip/BottomTooltipViewModel";
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
    systemUnderTest.displayLearningElement({
      id: 1,
      name: "Test",
      learningElementData: {
        type: "text",
      },
    });
    expect(vm.text.Value).toBe("Test");
    expect(vm.show.Value).toBe(true);
  });
});
