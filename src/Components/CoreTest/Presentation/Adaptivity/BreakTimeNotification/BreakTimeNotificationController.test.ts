import BreakTimeNotificationController from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationController";
import BreakTimeNotificationViewModel from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationViewModel";

describe("BreakTimeNotificationController", () => {
  let systemUnderTest: BreakTimeNotificationController;
  let viewModel: BreakTimeNotificationViewModel;

  beforeEach(() => {
    viewModel = new BreakTimeNotificationViewModel();
    systemUnderTest = new BreakTimeNotificationController(viewModel);
  });

  // ANF-ID: [EKJ0005, EKJ0006]
  test("closeBreakNotification sets correct value in the viewModel", () => {
    viewModel = new BreakTimeNotificationViewModel();
    viewModel.showModal.Value = true;
    systemUnderTest = new BreakTimeNotificationController(viewModel);

    systemUnderTest.closeBreakNotification();
    expect(viewModel.showModal.Value).toEqual(false);
  });

  // ANF-ID: [EKJ0001, EKJ0002, EKJ0005, EKJ0006]
  test("minimizeOrMaximizeBreakNotification sets correct value in the viewModel", () => {
    viewModel = new BreakTimeNotificationViewModel();
    viewModel.showMinimizedModal.Value = true;
    systemUnderTest = new BreakTimeNotificationController(viewModel);

    systemUnderTest.minimizeOrMaximizeBreakNotification();
    expect(viewModel.showMinimizedModal.Value).toEqual(false);
    systemUnderTest.minimizeOrMaximizeBreakNotification();
    expect(viewModel.showMinimizedModal.Value).toEqual(true);
  });

  //ANF-ID: [EKJ 0003]
  test("setSliderIndex sets correct value in the viewModel", () => {
    viewModel = new BreakTimeNotificationViewModel();
    viewModel.slideIndex.Value = 1;
    systemUnderTest = new BreakTimeNotificationController(viewModel);

    systemUnderTest.setSliderIndex(2);
    expect(viewModel.slideIndex.Value).toEqual(2);
  });
});
