import GetUnseenBreakTimeNotificationUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpent/GetUnseenBreakTimeNotification/GetUnseenBreakTimeNotificationUseCase";
import { shortBreakTimeNotificationContents } from "../../../../../../Core/Domain/BreakTimeNotifications/BreakTimeNotifications";
import { BreakTimeNotificationType } from "../../../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

describe("GetUnseenBreakTimeNotificationUseCase", () => {
  let systemUnderTest: GetUnseenBreakTimeNotificationUseCase;

  beforeEach(() => {
    systemUnderTest = new GetUnseenBreakTimeNotificationUseCase();
  });

  test.each([
    BreakTimeNotificationType.Short,
    BreakTimeNotificationType.Medium,
    BreakTimeNotificationType.Long,
  ])("returns a BreakTimeNotification for %p", (type) => {
    const result = systemUnderTest.internalExecute(type);

    expect(shortBreakTimeNotificationContents).toContain(result);
  });

  test("sets notification.seenBefore true", () => {
    const result = systemUnderTest.internalExecute(
      BreakTimeNotificationType.Short,
    );

    expect(result.seenBefore).toBe(true);
  });
});
