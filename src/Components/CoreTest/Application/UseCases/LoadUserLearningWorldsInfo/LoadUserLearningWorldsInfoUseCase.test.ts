import { mock } from "jest-mock-extended";
import LoadUserLearningWorldsInfoUseCase from "../../../../Core/Application/UseCases/LoadUserLearningWorldsInfo/LoadUserLearningWorldsInfoUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { IInternalLoadUserInitialLearningWorldsInfoUseCase } from "../../../../Core/Application/UseCases/LoadUserInitialLearningWorldsInfo/ILoadUserInitialLearningWorldsInfoUseCase";
import UserInitialLearningWorldsInfoTO from "../../../../Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import { IInternalLoadLearningWorldUseCase } from "../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import LearningWorldTO from "../../../../Core/Application/DataTransferObjects/LearningWorldTO";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const loadUserInitialLearningWorldsInfoUseCaseMock =
  mock<IInternalLoadUserInitialLearningWorldsInfoUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const loadLearningWorldUseCaseMock = mock<IInternalLoadLearningWorldUseCase>();

describe("LoadUserInitialLearningWorldsInfoUseCase", () => {
  let systemUnderTest: LoadUserLearningWorldsInfoUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadLearningWorldUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase
    ).toConstantValue(loadUserInitialLearningWorldsInfoUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      LoadUserLearningWorldsInfoUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls world port twice, once initially, once with all data", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        name: "string",
        spaces: [],
        goals: [],
        id: 1,
        description: "string",
        evaluationLink: "string",
      } as LearningWorldEntity,
    ]);
    loadLearningWorldUseCaseMock.internalExecuteAsync.mockResolvedValue({
      name: "string",
      spaces: [],
      goals: [],
      id: 1,
      description: "string",
      evaluationLink: "string",
    } as LearningWorldTO);
    loadUserInitialLearningWorldsInfoUseCaseMock.internalExecuteAsync.mockResolvedValue(
      {
        worldInfo: [{ worldID: 1, worldName: "TestWorld" }],
      } as UserInitialLearningWorldsInfoTO
    );

    await systemUnderTest.executeAsync();

    expect(
      worldPortMock.onUserInitialLearningWorldsInfoLoaded
    ).toHaveBeenCalledTimes(1);
    expect(worldPortMock.onUserLearningWorldsInfoLoaded).toHaveBeenCalledTimes(
      1
    );
  });
});
