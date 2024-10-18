import BreakTimeNotificationPresenter from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationPresenter";
import BreakTimeNotificationViewModel from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationViewModel";
import { shortBreakTimeNotificationContents } from "../../../../Core/Domain/BreakTimeNotifications/BreakTimeNotifications";

describe("OverallTimeSpentAdaptivityNotificationPresenter", () => {
  let systemUnderTest: BreakTimeNotificationPresenter;
  let viewModel: BreakTimeNotificationViewModel;

  beforeEach(() => {
    viewModel = new BreakTimeNotificationViewModel();
    systemUnderTest = new BreakTimeNotificationPresenter(viewModel);
  });

  //ANF-ID: [EKJ0001]
  test("displayBreakTimeNotification sets correct values in the viewModel", () => {
    systemUnderTest.displayBreakTimeNotification(
      shortBreakTimeNotificationContents[0],
    );

    expect(viewModel.showModal.Value).toBe(true);
    expect(viewModel.notificationToDisplay.Value).toEqual(
      shortBreakTimeNotificationContents[0],
    );
  });
});
