import { mock } from "jest-mock-extended";
import { logger } from "../../../../../Lib/Logger";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import ICalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import { XAPiEvent } from "../../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import ScoreH5PElement from "../../../../Core/Application/UseCases/ScoreH5PElement/ScoreH5PElement";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ElementEntity from "../../../../Core/Domain/Entities/ElementEntity";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IElementPort from "../../../../Core/Ports/ElementPort/IElementPort";

jest.mock("../../../../../Lib/Logger");

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
elementEntityMock.parentSpaceId = 1;

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
const elementPortMock = mock<IElementPort>();
const calculateSpaceScoreUseCaseMock = mock<ICalculateSpaceScoreUseCase>();

const executeAsyncParams = {
  xapiData: {} as XAPiEvent,
  elementId: 42,
  courseId: 1,
};

describe("ScoreH5PElement", () => {
  let systemUnderTest: ScoreH5PElement;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendAdapterMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IElementPort).toConstantValue(
      elementPortMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.ICalculateSpaceScore).toConstantValue(
      calculateSpaceScoreUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(USECASE_TYPES.IScoreH5PElement);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync should resolves to true with correct params", async () => {
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
      h5pId: executeAsyncParams.elementId,
      courseId: 1,
      rawH5PEvent: executeAsyncParams.xapiData,
    });
  });

  test("executeAsync tries to filter for a space that contains given element", async () => {
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

    expect(calculateSpaceScoreUseCaseMock.execute).toHaveBeenCalledWith({
      spaceId: spaceEntityMock.id,
    });
  });

  test("executeAsync should call elementPort.onElementScored", async () => {
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

    expect(elementPortMock.onElementScored).toHaveBeenCalledWith(
      true,
      executeAsyncParams.elementId
    );
  });

  test("executeAsync rejects if data parameter is undefined", async () => {
    await expect(systemUnderTest.executeAsync(undefined)).rejects.toContain(
      "data is (atleast partly) undefined"
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
    setupEntityContainerMock([userEntityMock], [], [spaceEntityMock]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync(executeAsyncParams)
    ).rejects.toContain("No matching element found");
  });

  test("executeAsync rejects if EntityContainer returns more than one matching element entity", async () => {
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