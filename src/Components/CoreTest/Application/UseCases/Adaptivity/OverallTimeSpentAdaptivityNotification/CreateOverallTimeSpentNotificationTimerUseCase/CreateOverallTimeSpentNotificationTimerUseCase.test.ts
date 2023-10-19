import OverallTimeSpentAdaptivityNotificationEntity from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import CreateOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/CreateOverallTimeSpentNotificationTimerUseCase/CreateOverallTimeSpentNotificationTimerUseCase";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IStartOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";

const entityContainerMock = mock<IEntityContainer>();
const startTimerUseCaseMock =
  mock<IStartOverallTimeSpentNotificationTimerUseCase>();

describe("CreateOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: CreateOverallTimeSpentNotificationTimerUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IStartOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
    ).toConstantValue(startTimerUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ICreateOverallTimeSpentNotificationTimerUseCase
    );
  });

  test("execute creates only one timer (returns if there already is one)", () => {
    const entity = new OverallTimeSpentAdaptivityNotificationEntity();
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
