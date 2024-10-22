import NotificationPort from "../../../../Core/Application/Ports/NotificationPort/NotificationPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import INotificationAdapter, {
  NotificationType,
} from "../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import { BreakTimeNotificationType } from "../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { LocationScope } from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IBreakTimeNotification from "../../../../Core/Domain/BreakTimeNotifications/IBreakTimeNotification";

describe("NotificationPort", () => {
  let systemUnderTest: NotificationPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(NotificationPort);
  });

  test("displayNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock, LocationScope._global);

    systemUnderTest.onNotificationTriggered(
      LogLevelTypes.ERROR,
      "logmessage",
      "message" as NotificationType,
    );

    expect(uiAdapterMock.displayNotification).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "message" as NotificationType,
    );
  });

  test("displayBreakTimeNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<INotificationAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock, LocationScope._global);

    const notification: IBreakTimeNotification = {
      titleKey: "short_break",
      titleMessageKeys: ["short_break_message"],
      images: [],
      seenBefore: false,
    };

    systemUnderTest.displayBreakTimeNotification(notification);

    expect(uiAdapterMock.displayBreakTimeNotification).toHaveBeenCalledWith(
      notification,
    );
  });

  test("name returns NOTIFICATION-PORT", () => {
    expect(systemUnderTest.name()).toBe("NOTIFICATION-PORT");
  });
});
