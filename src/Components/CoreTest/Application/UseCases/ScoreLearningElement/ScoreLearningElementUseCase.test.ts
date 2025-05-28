import ScoreLearningElementUseCase from "../../../../Core/Application/UseCases/ScoreLearningElement/ScoreLearningElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import LearningElementEntity from "../../../../Core/Domain/Entities/LearningElementEntity";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { IInternalCalculateLearningWorldScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import IBeginStoryElementOutroCutSceneUseCase from "../../../../Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import UpdateExperiencePointsUseCase from "../../../../Core/Application/UseCases/UpdateExperiencePoints/UpdateExperiencePointsUseCase";

const entityContainerMock = mock<IEntityContainer>();
const backendAdapterMock = mock<IBackendPort>();
const InternalCalculateWorldScoreMock =
  mock<IInternalCalculateLearningWorldScoreUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const beginStoryElementOutroCutSceneUseCaseMock =
  mock<IBeginStoryElementOutroCutSceneUseCase>();

const getNewTestEntities = () => {
  const userEntity: UserDataEntity = {
    isLoggedIn: true,
    username: "",
    userToken: "",
    availableWorlds: [],
    currentWorldID: undefined,
    currentSpaceID: undefined,
  } as Partial<UserDataEntity> as UserDataEntity;
  const elementEntity: LearningElementEntity = {
    id: 1,
    value: 0,
    hasScored: false,
    name: "",
    description: "",
    goals: [""],
    type: "h5p",
    parentWorldID: 0,
    model: LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC1,
  };
  const spaceEntity: LearningSpaceEntity = {
    id: 1,
    name: "",
    elements: [elementEntity],
    description: "",
    goals: [""],
    requirements: "",
    requiredScore: 0,
    parentWorldID: 200,
    template: LearningSpaceTemplateType.None,
    theme: LearningSpaceThemeType.Suburb,
    storyElements: [],
  };

  return {
    userEntity,
    elementEntity,
    spaceEntity,
  };
};

const setupEntityContainerMock = (
  userEntityMock: UserDataEntity[],
  elementEntityMock: LearningElementEntity[],
  spaceEntityMock: LearningSpaceEntity[],
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
    },
  );
};

describe("ScoreLearningElementUseCase", () => {
  let systemUnderTest: ScoreLearningElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IBackendPort>(
      CORE_TYPES.IBackendAdapter,
    ).toConstantValue(backendAdapterMock);
    CoreDIContainer.rebind<IInternalCalculateLearningWorldScoreUseCase>(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase,
    ).toConstantValue(InternalCalculateWorldScoreMock);
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).toConstantValue(worldPortMock);
    CoreDIContainer.rebind<IGetUserLocationUseCase>(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind<IBeginStoryElementOutroCutSceneUseCase>(
      USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase,
    ).toConstantValue(beginStoryElementOutroCutSceneUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IScoreLearningElementUseCase,
    );
    UpdateExperiencePointsUseCase.prototype.internalExecute = jest.fn();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EZZ0009]
  test("executeAsync resolves successfully with correct params", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreElement.mockResolvedValue(true);

    await expect(systemUnderTest.executeAsync(1)).resolves.toBeUndefined();
  });

  // ANF-ID: [EZZ0011]
  test("executeAsync should call backendAdapter.scoreElement", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(1);
    } catch (e) {
      console.log(e);
    }

    expect(backendAdapterMock.scoreElement).toHaveBeenCalledWith(
      userEntity.userToken,
      1,
      1,
    );
  });

  test("executeAsync should call calculateLearningWorldScoreUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);
    backendAdapterMock.scoreElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(1);
    } catch (e) {
      console.log(e);
    }

    expect(
      InternalCalculateWorldScoreMock.internalExecute,
    ).toHaveBeenCalledTimes(1);
  });

  test("executeAsync should call worldPort.onElementScored", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);
    backendAdapterMock.scoreElement.mockResolvedValue(true);

    try {
      await systemUnderTest.executeAsync(1);
    } catch (e) {
      console.log(e);
    }

    expect(worldPortMock.onLearningElementScored).toHaveBeenCalledWith(true, 1);
    expect(worldPortMock.onLearningSpaceScored).toHaveBeenCalled();
    expect(worldPortMock.onLearningWorldScored).toHaveBeenCalled();
  });

  test("executeAsync rejects when the call to scoreElement() on the Backend fails", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [elementEntity], [spaceEntity]);
    backendAdapterMock.scoreElement.mockRejectedValue("error");

    await expect(systemUnderTest.executeAsync(1)).rejects.toContain(
      "Backend call failed",
    );
  });

  test("executeAsync rejects if EntityContainer returns no matching element entity", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [], [spaceEntity]);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(systemUnderTest.executeAsync(1)).rejects.toContain(
      "No matching element found",
    );
  });

  test("executeAsync rejects if EntityContainer returns more than one matching element entity", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity, spaceEntity } = getNewTestEntities();
    setupEntityContainerMock(
      [userEntity],
      [elementEntity, elementEntity],
      [spaceEntity],
    );
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(systemUnderTest.executeAsync(1)).rejects.toContain(
      "More than one matching element found",
    );
  });

  test("executeAsync rejects if spaceID is set undefined in UserLocation", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: 1,
    } as UserLocationTO);
    const { userEntity, elementEntity } = getNewTestEntities();
    setupEntityContainerMock([userEntity], [elementEntity], []);
    backendAdapterMock.scoreH5PElement.mockResolvedValue(true);

    await expect(systemUnderTest.executeAsync(1)).rejects.toContain(
      "User is not in a space!",
    );
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
      expect.stringContaining(warningMessage),
    );
  });

  test("rejectWithWarning rejects with given message", async () => {
    const warningMessage = "warning message";
    await expect(
      systemUnderTest["rejectWithWarning"](warningMessage),
    ).rejects.toContain(warningMessage);
  });
});
