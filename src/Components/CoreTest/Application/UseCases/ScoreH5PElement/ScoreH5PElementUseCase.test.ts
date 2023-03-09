import { mock } from "jest-mock-extended";
import { logger } from "../../../../../Lib/Logger";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import ICalculateSpaceScoreUseCase, {
  IInternalCalculateSpaceScoreUseCase,
} from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import { XAPiEvent } from "../../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElementUseCase";
import ScoreH5PElementUseCase from "../../../../Core/Application/UseCases/ScoreH5PElement/ScoreH5PElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ElementEntity from "../../../../Core/Domain/Entities/ElementEntity";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";

jest.mock("../../../../../Lib/Logger");

const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();

// create EntityContainer mock
const entityContainerMock = mock<IEntityContainer>();
const userEntityMock = new UserDataEntity();
userEntityMock.isLoggedIn = true;
userEntityMock.userToken = "test";
userEntityMock.username = "test";
const spaceEntityMock = new SpaceEntity();
spaceEntityMock.id = 1;
const elementEntityMock = new ElementEntity();
elementEntityMock.id = 1;
elementEntityMock.parentSpaceID = 1;

const setupEntityContainerMock = (
  userEntityMock: UserDataEntity[],
  elementEntityMock: ElementEntity[],
  spaceEntityMock: SpaceEntity[]
) => {
  entityContainerMock.getEntitiesOfType.mockImplementation((entityType) => {
    if (entityType === UserDataEntity) {
      return userEntityMock;
    } else if (entityType === ElementEntity) {
      return elementEntityMock;
    } else if (entityType === SpaceEntity) {
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
      } else if (entityType === ElementEntity) {
        return elementEntityMock;
      } else if (entityType === SpaceEntity) {
        return spaceEntityMock;
      }
      return [];
    }
  );
};

// create BackendAdapter mock
const backendAdapterMock = mock<IBackendAdapter>();

// create other mocks
const worldPortMock = mock<IWorldPort>();
const calculateSpaceScoreUseCaseMock =
  mock<IInternalCalculateSpaceScoreUseCase>();

const executeAsyncParams = {
  xapiData: {} as XAPiEvent,
  elementID: 42,
  courseID: 1,
};

describe("ScoreH5PElementUseCase", () => {
  let systemUnderTest: ScoreH5PElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendAdapterMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IScoreH5PElementUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

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
      SpaceEntity,
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
      spaceEntityMock.id
    );
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

    expect(worldPortMock.onElementScored).toHaveBeenCalledWith(
      true,
      executeAsyncParams.elementID
    );
  });

  test("executeAsync rejects if EntityContainer returns no user entity", async () => {
    setupEntityContainerMock([], [elementEntityMock], [spaceEntityMock]);

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).rejects.toContain("User is not logged in");
  });

  test("executeAsync rejects if user is not logged in", async () => {
    const notLoggedInuserEntityMock = new UserDataEntity();
    notLoggedInuserEntityMock.isLoggedIn = false;
    setupEntityContainerMock(
      [notLoggedInuserEntityMock],
      [elementEntityMock],
      [spaceEntityMock]
    );

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).rejects.toContain("User is not logged in");
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

    try {
      await systemUnderTest["rejectWithWarning"](warningMessage);
    } catch (e) {
      console.log(e);
    }

    expect(logger.warn).toHaveBeenCalledWith(
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
