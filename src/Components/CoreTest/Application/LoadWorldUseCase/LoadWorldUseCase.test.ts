import LoadWorldUseCase from "../../../Core/Application/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../Core/Ports/UIPort/IUIPort";
import UserDataEntity from "../../../Core/Domain/Entities/UserDataEntity";
import ILearningWorldPort from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import H5PLearningElementData from "../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import LearningRoomEntity from "../../../Core/Domain/Entities/LearningRoomEntity";
import LearningElementEntity from "../../../Core/Domain/Entities/LearningElementEntity";
import LearningWorldEntity from "../../../Core/Domain/Entities/LearningWorldEntity";
import ILoadAvatarUseCase from "../../../Core/Application/LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IBackend from "../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import LearningWorldTO from "../../../Core/Application/DataTransportObjects/LearningWorldTO";
import { minimalGetLearningWorldDataResponse } from "../../Adapters/BackendAdapter/BackendResponses";

const backendMock = mock<IBackend>();
const learningWorldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const uiPortMock = mock<IUIPort>();
const loadAvatarUsecaseMock = mock<ILoadAvatarUseCase>();

/*
  Note: The test for the "mapLearningElement" extracted in its own file, sice it is
  very long
*/

describe("LoadWorldUseCase", () => {
  let systemUnderTest: LoadWorldUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
    CoreDIContainer.rebind(USECASE_TYPES.ILoadAvatarUseCase).toConstantValue(
      loadAvatarUsecaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadWorldUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("Detects, if a User is not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    await expect(systemUnderTest.executeAsync()).rejects.toEqual(
      "User is not logged in"
    );

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(uiPortMock.displayModal).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("Throws, if no User Entity is present", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync()).rejects.toEqual(
      "User is not logged in"
    );

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
  });

  test("Displays error, if User is not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    await expect(systemUnderTest.executeAsync()).rejects.not.toBeUndefined();

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(uiPortMock.displayModal).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("loads the Learning World and notifies its presenters", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      {
        isLoggedIn: true,
        userToken: "token",
      } as UserDataEntity,
    ]);
    // mock learning world response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getLearningWorldData.mockResolvedValueOnce(
      minimalGetLearningWorldDataResponse
    );

    // mock entity creation
    const mockedLearningWorldEntity = new LearningWorldEntity();
    mockedLearningWorldEntity.worldName =
      minimalGetLearningWorldDataResponse.worldName;
    mockedLearningWorldEntity.worldGoal =
      minimalGetLearningWorldDataResponse.worldGoal;
    mockedLearningWorldEntity.learningRooms = [];

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>()
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningRoomEntity>()
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mockedLearningWorldEntity
    );

    await systemUnderTest.executeAsync();

    expect(learningWorldPortMock.presentLearningWorld).toHaveBeenCalledTimes(1);
    expect(learningWorldPortMock.presentLearningWorld).toHaveBeenCalledWith(
      expect.any(LearningWorldTO)
    );
  });
});
