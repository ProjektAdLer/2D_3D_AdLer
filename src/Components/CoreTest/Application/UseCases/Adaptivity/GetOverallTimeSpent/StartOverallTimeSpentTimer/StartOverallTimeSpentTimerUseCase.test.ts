import BreakTimeNotificationEntity, {
  BreakTimeNotificationType,
} from "../../../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import INotificationPort from "../../../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import StartOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/StartOverallTimeSpentTimer/StartOverallTimeSpentTimerUseCase";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import IPauseOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/PauseOverallTimeSpentTimer/IPauseOverallTimeSpentTimerUseCase";

const notificationPortmock = mock<INotificationPort>();
const entitycontainermock = mock<IEntityContainer>();
const pauseUseCaseMock = mock<IPauseOverallTimeSpentTimerUseCase>();

describe("StartOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: StartOverallTimeSpentTimerUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort
    ).toConstantValue(notificationPortmock);

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entitycontainermock);

    CoreDIContainer.rebind<IPauseOverallTimeSpentTimerUseCase>(
      USECASE_TYPES.IPauseOverallTimeSpentTimerUseCase
    ).toConstantValue(pauseUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      StartOverallTimeSpentTimerUseCase
    );
  });

  test("execute notifies NotificationPort (type: short)", () => {
    jest.useFakeTimers();
    const entity = new BreakTimeNotificationEntity();
    entity.notificationIterator = 0;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortmock.displayBreakTimeNotification
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortmock.displayBreakTimeNotification
    ).toHaveBeenCalledWith(BreakTimeNotificationType.Short);

    jest.useRealTimers();
  });
  test("execute notifies NotificationPort (type: medium)", () => {
    jest.useFakeTimers();
    const entity = new BreakTimeNotificationEntity();
    entity.notificationIterator = 3;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortmock.displayBreakTimeNotification
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortmock.displayBreakTimeNotification
    ).toHaveBeenCalledWith(BreakTimeNotificationType.Medium);

    jest.useRealTimers();
  });
  test("execute notifies NotificationPort (type: long)", () => {
    jest.useFakeTimers();
    const entity = new BreakTimeNotificationEntity();
    entity.notificationIterator = 7;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortmock.displayBreakTimeNotification
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortmock.displayBreakTimeNotification
    ).toHaveBeenCalledWith(BreakTimeNotificationType.Long);

    jest.useRealTimers();
  });
});