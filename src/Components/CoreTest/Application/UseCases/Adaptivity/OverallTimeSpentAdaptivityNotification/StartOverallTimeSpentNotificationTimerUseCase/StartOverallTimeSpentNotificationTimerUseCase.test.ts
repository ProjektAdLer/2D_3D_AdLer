import { OverallTimeSpentAdaptivityNotificationBreakType } from "./../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import OverallTimeSpentAdaptivityNotificationEntity from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import INotificationPort from "../../../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import StartOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/StartOverallTimeSpentNotificationTimerUseCase";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import IPauseOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/PauseOverallTimeSpentNotificationTimerUseCase/IPauseOverallTimeSpentNotificationTimerUseCase";

const notificationPortmock = mock<INotificationPort>();
const entitycontainermock = mock<IEntityContainer>();
const pauseUseCaseMock = mock<IPauseOverallTimeSpentNotificationTimerUseCase>();

describe("StartOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: StartOverallTimeSpentNotificationTimerUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort
    ).toConstantValue(notificationPortmock);

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entitycontainermock);

    CoreDIContainer.rebind<IPauseOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IPauseOverallTimeSpentNotificationTimerUseCase
    ).toConstantValue(pauseUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      StartOverallTimeSpentNotificationTimerUseCase
    );
  });

  test("execute notifies NotificationPort (type: short)", () => {
    jest.useFakeTimers();
    const entity = new OverallTimeSpentAdaptivityNotificationEntity();
    entity.notificationIterator = 0;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortmock.displayOverallTimeSpentAdaptivityNotification
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortmock.displayOverallTimeSpentAdaptivityNotification
    ).toHaveBeenCalledWith(
      OverallTimeSpentAdaptivityNotificationBreakType.Short
    );

    jest.useRealTimers();
  });
  test("execute notifies NotificationPort (type: medium)", () => {
    jest.useFakeTimers();
    const entity = new OverallTimeSpentAdaptivityNotificationEntity();
    entity.notificationIterator = 3;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortmock.displayOverallTimeSpentAdaptivityNotification
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortmock.displayOverallTimeSpentAdaptivityNotification
    ).toHaveBeenCalledWith(
      OverallTimeSpentAdaptivityNotificationBreakType.Medium
    );

    jest.useRealTimers();
  });
  test("execute notifies NotificationPort (type: long)", () => {
    jest.useFakeTimers();
    const entity = new OverallTimeSpentAdaptivityNotificationEntity();
    entity.notificationIterator = 7;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortmock.displayOverallTimeSpentAdaptivityNotification
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortmock.displayOverallTimeSpentAdaptivityNotification
    ).toHaveBeenCalledWith(
      OverallTimeSpentAdaptivityNotificationBreakType.Long
    );

    jest.useRealTimers();
  });
});
