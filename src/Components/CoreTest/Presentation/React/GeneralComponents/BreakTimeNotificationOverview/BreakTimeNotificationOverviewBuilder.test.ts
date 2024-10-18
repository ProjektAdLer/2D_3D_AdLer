import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBreakTimeNotificationOverviewPresenter from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/IBreakTimeNotificationOverviewPresenter";
import BreakTimeNotificationOverviewBuilder from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewBuilder";

describe("BreakTimeNotificationOverviewBuilder", () => {
  let systemUnderTest: BreakTimeNotificationOverviewBuilder;

  beforeEach(() => {
    systemUnderTest = new BreakTimeNotificationOverviewBuilder();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
      ),
    ).toBe(true);
    expect(
      CoreDIContainer.get(
        PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
      ),
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
    ).toConstantValue(mock<IBreakTimeNotificationOverviewPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
