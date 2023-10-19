import OverallTimeSpentAdaptivityNotificationController from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";

describe("OverallTimeSpentNotificationController", () => {
  let systemUnderTest: OverallTimeSpentAdaptivityNotificationController;
  let viewModel: OverallTimeSpentAdaptivityNotificationViewModel;

  beforeEach(() => {
    viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();
    systemUnderTest = new OverallTimeSpentAdaptivityNotificationController(
      viewModel
    );
  });

  test("closeBreakNotification sets correct value in the viewModel", () => {
    viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();
    viewModel.showModal.Value = true;
    systemUnderTest = new OverallTimeSpentAdaptivityNotificationController(
      viewModel
    );

    systemUnderTest.closeBreakNotification();
    expect(viewModel.showModal.Value).toEqual(false);
  });
  test("minimizeOrMaximizeBreakNotification sets correct value in the viewModel", () => {
    viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();
    viewModel.showMinimizedModal.Value = true;
    systemUnderTest = new OverallTimeSpentAdaptivityNotificationController(
      viewModel
    );

    systemUnderTest.minimizeOrMaximizeBreakNotification();
    expect(viewModel.showMinimizedModal.Value).toEqual(false);
    systemUnderTest.minimizeOrMaximizeBreakNotification();
    expect(viewModel.showMinimizedModal.Value).toEqual(true);
  });
});
