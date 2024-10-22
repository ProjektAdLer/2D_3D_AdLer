import BreakTimeNotificationOverviewViewModel from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewViewModel";
import BreakTimeNotificationOverviewPresenter from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewPresenter";

describe("BreakTimeNotificationOverviewPresenter", () => {
  test("openModal sets show modal to true in view model", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    const systemUnderTest = new BreakTimeNotificationOverviewPresenter(
      viewModel,
    );

    systemUnderTest.openModal();

    expect(viewModel.showModal.Value).toBe(true);
  });
});
