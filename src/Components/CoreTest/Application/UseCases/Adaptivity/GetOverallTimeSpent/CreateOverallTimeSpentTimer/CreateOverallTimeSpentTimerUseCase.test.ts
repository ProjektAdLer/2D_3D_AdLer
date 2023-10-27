import BreakTimeNotificationEntity from "../../../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import CreateOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/CreateOverallTimeSpentTimer/CreateOverallTimeSpentTimerUseCase";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IStartOverallTimeSpentTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";

const entityContainerMock = mock<IEntityContainer>();
const startTimerUseCaseMock = mock<IStartOverallTimeSpentTimerUseCase>();

describe("CreateOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: CreateOverallTimeSpentTimerUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IStartOverallTimeSpentTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentTimerUseCase
    ).toConstantValue(startTimerUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ICreateOverallTimeSpentTimerUseCase
    );
  });

  test("execute creates only one timer (returns if there already is one)", () => {
    const entity = new BreakTimeNotificationEntity();
    entity.notificationIterator = 0;
    entityContainerMock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(0);
  });
  test("execute calls execute of startTimerUsecase", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);
    systemUnderTest.execute();
    expect(startTimerUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
