import NotificationPort from "../../../../Core/Application/Ports/NotificationPort/NotificationPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import INotificationAdapter, {
  NotificationType,
} from "../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import { BreakTimeNotificationType } from "../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

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
      "error" as NotificationType,
    );

    expect(uiAdapterMock.displayNotification).toBeCalledWith(
      "error message",
      "error" as NotificationType,
    );
  });

  test("displayBreakTimeNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock);
    const breakType = BreakTimeNotificationType.Medium;

    systemUnderTest.displayBreakTimeNotification(breakType);

    expect(uiAdapterMock.displayBreakTimeNotification).toBeCalledWith(
      breakType,
    );
  });

  test("name returns NOTIFICATION-PORT", () => {
    expect(systemUnderTest.name()).toBe("NOTIFICATION-PORT");
  });
});
