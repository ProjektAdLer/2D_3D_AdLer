import NotificationPort from "../../../../Core/Application/Ports/NotificationPort/NotificationPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import INotificationAdapter, {
  NotificationType,
} from "../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";

describe("NotificationPort", () => {
  let systemUnderTest: NotificationPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(NotificationPort);
  });

  test("displayNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock);

    systemUnderTest.displayNotification(
      "error message",
      "error" as NotificationType
    );

    expect(uiAdapterMock.displayNotification).toBeCalledWith(
      "error message",
      "error" as NotificationType
    );
  });

  test("displayOverallTimeSpentAdaptivityNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock);
    const breakType = OverallTimeSpentAdaptivityNotificationBreakType.Medium;

    systemUnderTest.displayOverallTimeSpentAdaptivityNotification(breakType);

    expect(
      uiAdapterMock.displayOverallTimeSpentAdaptivityNotification
    ).toBeCalledWith(breakType);
  });
});
