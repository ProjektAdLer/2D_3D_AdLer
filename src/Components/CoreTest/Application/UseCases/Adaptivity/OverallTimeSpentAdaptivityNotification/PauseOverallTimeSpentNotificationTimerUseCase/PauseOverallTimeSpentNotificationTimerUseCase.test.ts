import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import OverallTimeSpentAdaptivityNotificationEntity from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import INotificationPort from "../../../../../../Core/Application/Ports/NotificationPort/INotificationAdapter";
import StartOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/StartOverallTimeSpentNotificationTimerUseCase";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import type IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import IPauseOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/PauseOverallTimeSpentNotificationTimerUseCase/IPauseOverallTimeSpentNotificationTimerUseCase";
import PauseOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/PauseOverallTimeSpentNotificationTimerUseCase/PauseOverallTimeSpentNotificationTimerUseCase";
import IStartOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";

const entitycontainermock = mock<IEntityContainer>();
const startUseCaseMock = mock<IStartOverallTimeSpentNotificationTimerUseCase>();

describe("StartOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: PauseOverallTimeSpentNotificationTimerUseCase;
  let entity: OverallTimeSpentAdaptivityNotificationEntity;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entitycontainermock);

    CoreDIContainer.rebind<IStartOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
    ).toConstantValue(startUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      PauseOverallTimeSpentNotificationTimerUseCase
    );
    entity = new OverallTimeSpentAdaptivityNotificationEntity();
    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);
  });

  test("internalExecute calls StartOverallTimeSpentAdaptivityTimerUseCase on short breaktype", () => {
    jest.useFakeTimers();
    entity.notificationType =
      OverallTimeSpentAdaptivityNotificationBreakType.Short;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    expect(entity.notificationType).toBe(
      OverallTimeSpentAdaptivityNotificationBreakType.Medium
    );

    jest.advanceTimersByTime(entity.notificationType * 1000 * 60 + 1);
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("internalExecute calls StartOverallTimeSpentAdaptivityTimerUseCase on medium breaktype", () => {
    jest.useFakeTimers();
    entity.notificationType =
      OverallTimeSpentAdaptivityNotificationBreakType.Medium;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    expect(entity.notificationType).toBe(
      OverallTimeSpentAdaptivityNotificationBreakType.Long
    );

    jest.advanceTimersByTime(entity.notificationType * 1000 * 60 + 1);
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("internalExecute calls not StartOverallTimeSpentAdaptivityTimerUseCase on long breaktype", () => {
    entity.notificationType =
      OverallTimeSpentAdaptivityNotificationBreakType.Long;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    expect(entity.notificationType).toBe(
      OverallTimeSpentAdaptivityNotificationBreakType.None
    );

    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(0);
  });

  test("internalExecute calls nothing on none breaktype", () => {
    entity.notificationType =
      OverallTimeSpentAdaptivityNotificationBreakType.None;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    expect(entity.notificationType).toBe(
      OverallTimeSpentAdaptivityNotificationBreakType.None
    );

    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(0);
  });
});
