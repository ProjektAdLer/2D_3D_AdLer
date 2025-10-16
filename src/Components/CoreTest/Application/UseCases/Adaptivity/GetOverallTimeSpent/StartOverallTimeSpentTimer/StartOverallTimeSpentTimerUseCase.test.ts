import BreakTimeNotificationEntity, {
  BreakTimeNotificationType,
} from "../../../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import INotificationPort from "../../../../../../Core/Application/Ports/Interfaces/INotificationPort";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock, { mockDeep } from "jest-mock-extended/lib/Mock";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import IPauseOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpent/PauseOverallTimeSpentTimer/IPauseOverallTimeSpentTimerUseCase";
import StartOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpent/StartOverallTimeSpentTimer/StartOverallTimeSpentTimerUseCase";
import GetUnseenBreakTimeNotificationUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpent/GetUnseenBreakTimeNotification/GetUnseenBreakTimeNotificationUseCase";
import IGetUnseenBreakTimeNotificationUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpent/GetUnseenBreakTimeNotification/IGetUnseenBreakTimeNotificationUseCase";
import IGetSettingsConfigUseCase from "../../../../../../Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";

const notificationPortMock = mock<INotificationPort>();
const entityContainerMock = mock<IEntityContainer>();
const pauseUseCaseMock = mock<IPauseOverallTimeSpentTimerUseCase>();
const getUnseenBreakTimeNotificationsUseCaseMock =
  mockDeep<GetUnseenBreakTimeNotificationUseCase>();
const getSettingsConfigUseCaseMock = mock<IGetSettingsConfigUseCase>();

describe("StartOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: StartOverallTimeSpentTimerUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort,
    ).toConstantValue(notificationPortMock);

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);

    CoreDIContainer.rebind<IPauseOverallTimeSpentTimerUseCase>(
      USECASE_TYPES.IPauseOverallTimeSpentTimerUseCase,
    ).toConstantValue(pauseUseCaseMock);

    CoreDIContainer.rebind<IGetUnseenBreakTimeNotificationUseCase>(
      USECASE_TYPES.IGetUnseenBreakTimeNotificationUseCase,
    ).toConstantValue(getUnseenBreakTimeNotificationsUseCaseMock);

    CoreDIContainer.rebind<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).toConstantValue(getSettingsConfigUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      StartOverallTimeSpentTimerUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //ANF-ID: [EKJ0001]
  test("execute notifies NotificationPort (type: short)", () => {
    jest.useFakeTimers();
    const entity = new BreakTimeNotificationEntity();
    entity.breakTimeIntervalCounter = 0;

    const mockNotification = {
      type: BreakTimeNotificationType.Short,
    };
    getUnseenBreakTimeNotificationsUseCaseMock.internalExecute.mockReturnValue(
      mockNotification,
    );

    getSettingsConfigUseCaseMock.execute.mockReturnValue({
      breakTimeNotificationsEnabled: true,
    });

    entityContainerMock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).toHaveBeenCalledWith(mockNotification);

    jest.useRealTimers();
  });

  //ANF-ID: [EKJ0001]
  test("execute notifies NotificationPort (type: medium)", () => {
    jest.useFakeTimers();
    const entity = new BreakTimeNotificationEntity();
    entity.breakTimeIntervalCounter = 3;

    const mockNotification = {
      type: BreakTimeNotificationType.Medium,
    };
    getUnseenBreakTimeNotificationsUseCaseMock.internalExecute.mockReturnValue(
      mockNotification,
    );

    getSettingsConfigUseCaseMock.execute.mockReturnValue({
      breakTimeNotificationsEnabled: true,
    });

    entityContainerMock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).toHaveBeenCalledWith(mockNotification);

    jest.useRealTimers();
  });

  //ANF-ID: [EKJ0001]
  test("execute notifies NotificationPort (type: long)", () => {
    jest.useFakeTimers();
    const entity = new BreakTimeNotificationEntity();
    entity.breakTimeIntervalCounter = 7;

    const mockNotification = {
      type: BreakTimeNotificationType.Long,
    };
    getUnseenBreakTimeNotificationsUseCaseMock.internalExecute.mockReturnValue(
      mockNotification,
    );
    getSettingsConfigUseCaseMock.execute.mockReturnValue({
      breakTimeNotificationsEnabled: true,
    });

    entityContainerMock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();

    jest.advanceTimersByTime(30 * 1000 * 60 + 1);
    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).toHaveBeenCalledTimes(1);
    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).toHaveBeenCalledWith(mockNotification);

    jest.useRealTimers();
  });
  test("execute doesn't do anything if break time notifications are disabled", () => {
    getSettingsConfigUseCaseMock.execute.mockReturnValue({
      breakTimeNotificationsEnabled: false,
    });

    systemUnderTest.execute();

    expect(
      notificationPortMock.displayBreakTimeNotification,
    ).not.toHaveBeenCalled();
  });
});
