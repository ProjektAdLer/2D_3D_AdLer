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

  test("OveralltimeSpentNotificationController sets correct value in the viewModel", () => {
    viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();
    viewModel.showModal.Value = true;
    systemUnderTest = new OverallTimeSpentAdaptivityNotificationController(
      viewModel
    );

    systemUnderTest.closeBreakNotification();
    expect(viewModel.showModal.Value).toEqual(false);
  });
});
