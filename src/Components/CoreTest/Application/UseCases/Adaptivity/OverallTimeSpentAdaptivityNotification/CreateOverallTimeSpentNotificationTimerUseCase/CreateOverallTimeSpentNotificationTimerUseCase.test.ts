import OverallTimeSpentAdaptivityNotificationEntity from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import CreateOverallTimeSpentNotificationTimerUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/CreateOverallTimeSpentNotificationTimerUseCase/CreateOverallTimeSpentNotificationTimerUseCase";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import mock from "jest-mock-extended/lib/Mock";
import CreateOverallTimeSpentNotificationUseCase from "../../../../../../Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/CreateOverallTimeSpentNotificationTimerUseCase/CreateOverallTimeSpentNotificationTimerUseCase";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const entityContainerMock = mock<IEntityContainer>();

describe("CreateOverallTimeSpentNotificationTimerUseCase", () => {
  let systemUnderTest: CreateOverallTimeSpentNotificationTimerUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ICreateOverallTimeSpentNotificationTimerUseCase
    );
  });

  test("execute creates only one timer", () => {
    const entity = new OverallTimeSpentAdaptivityNotificationEntity();
    entity.notificationType =
      OverallTimeSpentAdaptivityNotificationBreakType.Short;
    entityContainerMock.getEntitiesOfType.mockReturnValue([entity]);

    systemUnderTest.execute();
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(0);
  });
});
