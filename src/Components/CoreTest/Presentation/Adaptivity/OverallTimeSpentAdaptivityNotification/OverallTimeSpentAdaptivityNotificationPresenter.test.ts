import { OverallTimeSpentAdaptivityNotificationBreakType } from "./../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import OverallTimeSpentAdaptivityNotificationPresenter from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationPresenter";
import OverallTimeSpentAdaptivityNotificationViewModel from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";

describe("OverallTimeSpentAdaptivityNotificationPresenter", () => {
  let systemUnderTest: OverallTimeSpentAdaptivityNotificationPresenter;
  let viewModel: OverallTimeSpentAdaptivityNotificationViewModel;

  beforeEach(() => {
    viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();
    systemUnderTest = new OverallTimeSpentAdaptivityNotificationPresenter(
      viewModel
    );
  });

  test("displayOverallTimeSpentAdaptivityNotification sets correct values in the viewModel", () => {
    const newBreakType = OverallTimeSpentAdaptivityNotificationBreakType.Medium;

    systemUnderTest.displayOverallTimeSpentAdaptivityNotification(newBreakType);

    expect(viewModel.showModal.Value).toBe(true);
    expect(viewModel.breakType.Value).toEqual(newBreakType);
  });
});
