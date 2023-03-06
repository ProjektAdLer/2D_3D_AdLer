import ScoreElementUseCase from "../../../../Core/Application/UseCases/ScoreElement/ScoreElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import ElementEntity from "../../../../Core/Domain/Entities/ElementEntity";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import { logger } from "../../../../../Lib/Logger";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import ICalculateWorldScoreUseCase from "../../../../Core/Application/UseCases/CalculateWorldScore/ICalculateWorldScoreUseCase";

jest.mock("../../../../../Lib/Logger");

const entityContainerMock = mock<IEntityContainer>();
const backendAdapterMock = mock<IBackendAdapter>();
const CalculateWorldScoreMock = mock<ICalculateWorldScoreUseCase>();
const worldPortMock = mock<IWorldPort>();

const userEntity: UserDataEntity = {
  isLoggedIn: true,
  username: "",
  userToken: "",
};
const elementEntity: ElementEntity = {
  id: 1,
  value: 0,
  hasScored: false,
  name: "",
  description: "",
  goals: "",
  type: "h5p",
  parentSpaceID: 0,
  parentWorldID: 0,
};
const spaceEntity: SpaceEntity = {
  id: 1,
  name: "",
  elements: [elementEntity],
  description: "",
  goals: "",
  requirements: [],
  requiredScore: 0,
  parentWorldID: 200,
};

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

describe("ScoreElementUseCase", () => {
  let systemUnderTest: ScoreElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendAdapterMock);
    CoreDIContainer.rebind<ICalculateWorldScoreUseCase>(
      USECASE_TYPES.ICalculateWorldScore
    ).toConstantValue(CalculateWorldScoreMock);
    CoreDIContainer.rebind<IWorldPort>(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(USECASE_TYPES.IScoreElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync resolves successfully with correct params", async () => {
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);

    await expect(
      systemUnderTest.executeAsync({
        elementID: 1,
        courseID: 0,
      })
    ).resolves.toBeUndefined();
  });

  test("executeAsync should call backendAdapter.scoreElement", async () => {
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync({ elementID: 1, courseID: 1 });
    } catch (e) {
      console.log(e);
    }

    expect(backendAdapterMock.scoreElement).toHaveBeenCalledWith(
      userEntity.userToken,
      1,
      1
    );
  });

  test("executeAsync should call calculateWorldScoreUseCase", async () => {
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync({ elementID: 1, courseID: 1 });
    } catch (e) {
      console.log(e);
    }

    expect(CalculateWorldScoreMock.execute).toHaveBeenCalledWith(
      spaceEntity.worldID
    );
  });

  test("executeAsync should call elementPort.onElementScored", async () => {
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync({ elementID: 1, courseID: 1 });
    } catch (e) {
      console.log(e);
    }

    expect(worldPortMock.onElementScored).toHaveBeenCalledWith(true, 1);
  });

  test("executeAsync rejects if data parameter is undefined", async () => {
    // @ts-ignore
    await expect(systemUnderTest.executeAsync(undefined)).rejects.toContain(
      "data is (atleast partly) undefined"
    );
  });

  test("executeAsync rejects if EntityContainer returns no user entity", async () => {
    setupEntityContainerMock([], [elementEntity], [spaceEntity]);

    await expect(
      systemUnderTest.executeAsync({ elementID: 1, courseID: 1 })
    ).rejects.toContain("User is not logged in");
  });

  test("executeAsync rejects if user is not logged in", async () => {
    const notLoggedInuserEntityMock = new UserDataEntity();
    notLoggedInuserEntityMock.isLoggedIn = false;
    setupEntityContainerMock(
      [notLoggedInuserEntityMock],
      [elementEntity],
      [spaceEntity]
    );

    await expect(
      systemUnderTest.executeAsync({ elementID: 1, courseID: 1 })
    ).rejects.toContain("User is not logged in");
  });

  test("executeAsync rejects when the call to scoreElement() on the Backend fails", async () => {
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreElement.mockRejectedValue("error");

    await expect(
      systemUnderTest.executeAsync({ elementID: 1, courseID: 1 })
    ).rejects.toContain("Backend call failed");
  });

  test("executeAsync rejects if EntityContainer returns no matching element entity", async () => {
    setupEntityContainerMock([userEntity], [], [spaceEntity]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync({ elementID: 1, courseID: 1 })
    ).rejects.toContain("No matching element found");
  });

  test("executeAsync rejects if EntityContainer returns more than one matching element entity", async () => {
    setupEntityContainerMock(
      [userEntity],
      [elementEntity, elementEntity],
      [spaceEntity]
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync({ elementID: 1, courseID: 1 })
    ).rejects.toContain("More than one matching element found");
  });

  test("executeAsync rejects if EntityContainer returns no matching space entity", async () => {
    setupEntityContainerMock([userEntity], [elementEntity], []);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(
      systemUnderTest.executeAsync({ elementID: 1, courseID: 1 })
    ).rejects.toContain("No matching space found");
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
