import GetUnseenBreakTimeNotificationUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpent/GetUnseenBreakTimeNotification/GetUnseenBreakTimeNotificationUseCase";
import {
  longBreakTimeNotificationContents,
  mediumBreakTimeNotificationContents,
  shortBreakTimeNotificationContents,
} from "../../../../../../Core/Domain/BreakTimeNotifications/BreakTimeNotifications";
import { BreakTimeNotificationType } from "../../../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

describe("GetUnseenBreakTimeNotificationUseCase", () => {
  let systemUnderTest: GetUnseenBreakTimeNotificationUseCase;

  beforeEach(() => {
    systemUnderTest = new GetUnseenBreakTimeNotificationUseCase();
  });

  test.each([
    {
      type: BreakTimeNotificationType.Short,
      content: shortBreakTimeNotificationContents,
    },
    {
      type: BreakTimeNotificationType.Medium,
      content: mediumBreakTimeNotificationContents,
    },
    {
      type: BreakTimeNotificationType.Long,
      content: longBreakTimeNotificationContents,
    },
  ])("returns a BreakTimeNotification for %p", (object) => {
    const result = systemUnderTest.internalExecute(object.type);

    expect(object.content).toContain(result);
  });

  test("sets notification.seenBefore true", () => {
    const result = systemUnderTest.internalExecute(
      BreakTimeNotificationType.Short,
    );

    expect(result.seenBefore).toBe(true);
  });
});
