import { BreakTimeNotificationType } from "./../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import BreakTimeNotificationPresenter from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationPresenter";
import BreakTimeNotificationViewModel from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationViewModel";

describe("OverallTimeSpentAdaptivityNotificationPresenter", () => {
  let systemUnderTest: BreakTimeNotificationPresenter;
  let viewModel: BreakTimeNotificationViewModel;

  beforeEach(() => {
    viewModel = new BreakTimeNotificationViewModel();
    systemUnderTest = new BreakTimeNotificationPresenter(viewModel);
  });

  //EKJ0001
  test("displayBreakTimeNotification sets correct values in the viewModel", () => {
    const newBreakType = BreakTimeNotificationType.Medium;

    systemUnderTest.displayBreakTimeNotification(newBreakType);

    expect(viewModel.showModal.Value).toBe(true);
    expect(viewModel.breakType.Value).toEqual(newBreakType);
  });
});
