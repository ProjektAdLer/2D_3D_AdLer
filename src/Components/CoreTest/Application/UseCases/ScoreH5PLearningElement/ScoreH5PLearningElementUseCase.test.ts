import { mock } from "jest-mock-extended";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import { XAPIEvent } from "../../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import ScoreH5PLearningElementUseCase from "../../../../Core/Application/UseCases/ScoreH5PLearningElement/ScoreH5PLearningElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningElementEntity from "../../../../Core/Domain/Entities/LearningElementEntity";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { IInternalCalculateLearningWorldScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import IBeginStoryElementOutroCutSceneUseCase from "../../../../Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";

const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const beginStoryElementOutroCutSceneUseCaseMock =
  mock<IBeginStoryElementOutroCutSceneUseCase>();

// create EntityContainer mock
const entityContainerMock = mock<IEntityContainer>();
const userEntityMock = new UserDataEntity();
userEntityMock.isLoggedIn = true;
userEntityMock.userToken = "test";
userEntityMock.username = "test";
const spaceEntityMock = new LearningSpaceEntity();
spaceEntityMock.id = 1;
const elementEntityMock = new LearningElementEntity();
elementEntityMock.id = 1;

const setupEntityContainerMock = (
  userEntityMock: UserDataEntity[],
  elementEntityMock: LearningElementEntity[],
  spaceEntityMock: LearningSpaceEntity[]
) => {
  entityContainerMock.getEntitiesOfType.mockImplementation((entityType) => {
    if (entityType === UserDataEntity) {
      return userEntityMock;
    } else if (entityType === LearningElementEntity) {
      return elementEntityMock;
    } else if (entityType === LearningSpaceEntity) {
      return spaceEntityMock;
    }
    return [];
  });
  entityContainerMock.filterEntitiesOfType.mockImplementation(
    (entityType, filter) => {
      // call filter function to make sure it is valid
      filter(new entityType());

      if (entityType === UserDataEntity) {
        return userEntityMock;
      } else if (entityType === LearningElementEntity) {
        return elementEntityMock;
      } else if (entityType === LearningSpaceEntity) {
        return spaceEntityMock;
      }
      return [];
    }
  );
};

// create BackendAdapter mock
const backendAdapterMock = mock<IBackendPort>();

// create other mocks
const worldPortMock = mock<ILearningWorldPort>();
const calculateSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const calculateWorldScoreUseCaseMock =
  mock<IInternalCalculateLearningWorldScoreUseCase>();

const executeAsyncParams = {
  xapiData: {} as XAPIEvent,
  elementID: 42,
  courseID: 1,
};

describe("ScoreH5PLearningElementUseCase", () => {
  let systemUnderTest: ScoreH5PLearningElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendAdapterMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase
    ).toConstantValue(calculateWorldScoreUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase
    ).toConstantValue(beginStoryElementOutroCutSceneUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IScoreH5PLearningElementUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync should reject if data is undefined", async () => {
    await expect(
      systemUnderTest.executeAsync({ xapiData: undefined as any, elementID: 1 })
    ).rejects.toContain("data is (atleast partly) undefined");
  });

  // ANF-ID: [EZZ0010]
  test("executeAsync should resolves to true with correct params", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).resolves.toBe(true);
  });

  // ANF-ID: [EZZ0011]
  test("executeAsync should call backendAdapter.scoreH5PElement", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(executeAsyncParams);
    } catch (e) {
      console.log(e);
    }

    expect(backendAdapterMock.scoreH5PElement).toHaveBeenCalledWith({
      userToken: userEntityMock.userToken,
      h5pID: executeAsyncParams.elementID,
      courseID: 1,
      rawH5PEvent: executeAsyncParams.xapiData,
    });
  });

  test("executeAsync tries to filter for a space that contains given element", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(executeAsyncParams);
    } catch (e) {
      console.log(e);
    }

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      LearningSpaceEntity,
      expect.any(Function)
    );
  });

  test("executeAsync should call calculateSpaceScoreUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(executeAsyncParams);
    } catch (e) {
      console.log(e);
    }

    expect(calculateSpaceScoreUseCaseMock.internalExecute).toHaveBeenCalledWith(
      {
        spaceID: 1,
        worldID: 1,
      }
    );
  });

  //ANF-ID: [EWE0042]
  test("executeAsync calls beginStoryElementOutroCutSceneUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(executeAsyncParams);
    } catch (e) {
      console.log(e);
    }

    expect(
      beginStoryElementOutroCutSceneUseCaseMock.execute
    ).toHaveBeenCalledWith({
      scoredLearningElementID: executeAsyncParams.elementID,
    });
  });

  test("executeAsync should call elementPort.onElementScored", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(executeAsyncParams);
    } catch (e) {
      console.log(e);
    }

    expect(worldPortMock.onLearningElementScored).toHaveBeenCalledWith(
      true,
      executeAsyncParams.elementID
    );
  });

  test("executeAsync rejects if user is not in a space", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );

    try {
      await systemUnderTest.executeAsync(executeAsyncParams);
    } catch (e) {
      expect(e.message).toBe("User is not in a space!");
    }
  });

  test("executeAsync rejects if EntityContainer returns no matching element entity", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock([userEntityMock], [], [spaceEntityMock]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).rejects.toContain("No matching element found");
  });

  test("executeAsync rejects if EntityContainer returns more than one matching element entity", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock(
      [userEntityMock],
      [elementEntityMock, elementEntityMock],
      [spaceEntityMock]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).rejects.toContain("More than one matching element found");
  });

  test("executeAsync rejects if EntityContainer returns no matching space entity", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    setupEntityContainerMock([userEntityMock], [elementEntityMock], []);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).rejects.toContain("Space with given element not found");
  });

  test("rejectWithWarning calls logger.warn", async () => {
    const warningMessage = "warning message";
    const loggerMock = jest.spyOn(Logger.prototype, "log");

    try {
      await systemUnderTest["rejectWithWarning"](warningMessage);
    } catch (e) {
      console.log(e);
    }

    expect(loggerMock).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining(warningMessage)
    );
  });

  test("rejectWithWarning rejects with given message", async () => {
    const warningMessage = "warning message";
    await expect(
      systemUnderTest["rejectWithWarning"](warningMessage)
    ).rejects.toContain(warningMessage);
  });
});
