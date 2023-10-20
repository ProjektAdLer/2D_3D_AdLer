import OverallTimeSpentAdaptivityNotificationEntity, {
  OverallTimeSpentAdaptivityNotificationBreakType,
} from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import type IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import PauseOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/PauseOverallTimeSpentNotificationTimerUseCase/PauseOverallTimeSpentNotificationTimerUseCase";
import IStartOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";

const entitycontainermock = mock<IEntityContainer>();
const startUseCaseMock = mock<IStartOverallTimeSpentNotificationTimerUseCase>();

describe("PauseOverallTimeSpentNotificationTimerUseCase", () => {
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
    entity.notificationIterator = 0;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    jest.advanceTimersByTime(
      OverallTimeSpentAdaptivityNotificationBreakType.Short * 1000 * 60 + 1
    );
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("internalExecute calls StartOverallTimeSpentAdaptivityTimerUseCase on medium breaktype", () => {
    jest.useFakeTimers();
    entity.notificationIterator = 4;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    jest.advanceTimersByTime(
      OverallTimeSpentAdaptivityNotificationBreakType.Medium * 1000 * 60 + 1
    );
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("internalExecute calls not StartOverallTimeSpentAdaptivityTimerUseCase on long breaktype", () => {
    jest.useFakeTimers();
    entity.notificationIterator = 8;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    jest.advanceTimersByTime(
      OverallTimeSpentAdaptivityNotificationBreakType.Long * 1000 * 60 + 1
    );
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
