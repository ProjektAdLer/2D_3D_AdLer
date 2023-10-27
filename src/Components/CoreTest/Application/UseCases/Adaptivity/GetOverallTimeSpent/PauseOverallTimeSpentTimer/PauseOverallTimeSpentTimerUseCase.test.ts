import BreakTimeNotificationEntity, {
  BreakTimeNotificationType,
} from "../../../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import type IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import PauseOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/PauseOverallTimeSpentTimer/PauseOverallTimeSpentTimerUseCase";
import IStartOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";

const entitycontainermock = mock<IEntityContainer>();
const startUseCaseMock = mock<IStartOverallTimeSpentTimerUseCase>();

describe("PauseOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: PauseOverallTimeSpentTimerUseCase;
  let entity: BreakTimeNotificationEntity;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entitycontainermock);

    CoreDIContainer.rebind<IStartOverallTimeSpentTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentTimerUseCase
    ).toConstantValue(startUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      PauseOverallTimeSpentTimerUseCase
    );
    entity = new BreakTimeNotificationEntity();
    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);
  });

  test("internalExecute calls StartOverallTimeSpentAdaptivityTimerUseCase on short breaktype", () => {
    jest.useFakeTimers();
    entity.notificationIterator = 0;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    jest.advanceTimersByTime(BreakTimeNotificationType.Short * 1000 * 60 + 1);
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("internalExecute calls StartOverallTimeSpentAdaptivityTimerUseCase on medium breaktype", () => {
    jest.useFakeTimers();
    entity.notificationIterator = 4;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    jest.advanceTimersByTime(BreakTimeNotificationType.Medium * 1000 * 60 + 1);
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("internalExecute calls not StartOverallTimeSpentAdaptivityTimerUseCase on long breaktype", () => {
    jest.useFakeTimers();
    entity.notificationIterator = 8;

    entitycontainermock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.internalExecute(startUseCaseMock);

    jest.advanceTimersByTime(BreakTimeNotificationType.Long * 1000 * 60 + 1);
    expect(startUseCaseMock.execute).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
