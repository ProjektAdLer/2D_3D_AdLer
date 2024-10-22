import mock from "jest-mock-extended/lib/Mock";
import BreakTimeNotificationOverviewController from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewViewModel from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewViewModel";
import IBreakTimeNotification from "../../../../../Core/Domain/BreakTimeNotifications/IBreakTimeNotification";

describe("BreakTimeNotificationOverviewController", () => {
  let systemUnderTest: BreakTimeNotificationOverviewController;

  test("selectNotification sets selected notification in view model", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    systemUnderTest = new BreakTimeNotificationOverviewController(viewModel);

    const notification = mock<IBreakTimeNotification>();

    systemUnderTest.selectNotification(notification);

    expect(viewModel.selectedNotification.Value).toBe(notification);
  });

  test("returnToOverview sets selected notification to null in view model", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    viewModel.selectedNotification.Value = mock<IBreakTimeNotification>();
    systemUnderTest = new BreakTimeNotificationOverviewController(viewModel);

    systemUnderTest.returnToOverview();

    expect(viewModel.selectedNotification.Value).toBeNull();
  });

  test("closeModal sets show modal to false and selected notification to null in view model", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    viewModel.showModal.Value = true;
    viewModel.selectedNotification.Value = mock<IBreakTimeNotification>();
    systemUnderTest = new BreakTimeNotificationOverviewController(viewModel);

    systemUnderTest.closeModal();

    expect(viewModel.showModal.Value).toBe(false);
    expect(viewModel.selectedNotification.Value).toBeNull();
  });
});
