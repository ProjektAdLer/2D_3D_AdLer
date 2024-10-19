import NotificationPort from "../../../../Core/Application/Ports/NotificationPort/NotificationPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import INotificationAdapter, {
  NotificationType,
} from "../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import { BreakTimeNotificationType } from "../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

describe("NotificationPort", () => {
  let systemUnderTest: NotificationPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(NotificationPort);
  });

  test("displayNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock);

    systemUnderTest.onNotificationTriggered(
      LogLevelTypes.ERROR,
      "logmessage",
      "message" as NotificationType,
    );

    expect(uiAdapterMock.displayNotification).toBeCalledWith(
      LogLevelTypes.ERROR,
      "message" as NotificationType,
    );
  });

  test("displayBreakTimeNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock);
    const breakType = BreakTimeNotificationType.Medium;

    systemUnderTest.onBreakTimeNotificationTriggered(breakType);

    expect(uiAdapterMock.displayBreakTimeNotification).toBeCalledWith(
      breakType,
    );
  });

  test("name returns NOTIFICATION-PORT", () => {
    expect(systemUnderTest.name()).toBe("NOTIFICATION-PORT");
  });
});
