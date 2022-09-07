import LoadWorldUseCase from "../../../Core/Application/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import IBackend from "../../../Core/Adapters/Backend/IBackend";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../Core/Ports/UIPort/IUIPort";
import UserDataEntity from "../../../Core/Domain/Entities/UserDataEntity";
import {
  correctFakeLearningElementsMinimalResponse,
  correctFakeRoomResponseMinimal,
  correctFakeWorldResponse,
} from "../../Adapters/Backend/BackendResponses";
import ILearningWorldPort from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import H5PLearningElementData from "../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import LearningRoomEntity from "../../../Core/Domain/Entities/LearningRoomEntity";
import LearningElementEntity from "../../../Core/Domain/Entities/LearningElementEntity";
import LearningWorldEntity from "../../../Core/Domain/Entities/LearningWorldEntity";
import ILoadAvatarUseCase from "../../../Core/Application/LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
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

    CoreDIContainer.rebind(CORE_TYPES.IBackend).toConstantValue(backendMock);
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
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      {
        isLoggedIn: true,
        userToken: "token",
      } as UserDataEntity,
    ]);
    backendMock.getWorld.mockResolvedValueOnce(correctFakeWorldResponse);
    backendMock.getLearningRooms.mockResolvedValueOnce(
      correctFakeRoomResponseMinimal
    );
    backendMock.getLearningElements.mockResolvedValue(
      correctFakeLearningElementsMinimalResponse
    );
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);

    const learningElementObject = {
      id: 1,
      name: "Test",
      value: 1,
      requirement: 1,
      learningElementData: {
        type: "h5p",
        contextId: 123,
        fileName: "fileName",
      } as H5PLearningElementData,
    } as Partial<LearningElementEntity>;

    systemUnderTest["mapLearningElement"] = jest
      .fn()
      .mockReturnValueOnce(learningElementObject);

    const learningRoomObject = {
      id: 1,
      learningElements: [learningElementObject],
    } as LearningRoomEntity;

    const learningWorldObject = {
      worldName: "Lernwelt Metriken",
      worldGoal: "Testgoal",
      learningRooms: [learningRoomObject],
    } as LearningWorldEntity;

    entityContainerMock.createEntity.mockReturnValueOnce(learningRoomObject);
    entityContainerMock.createEntity.mockReturnValueOnce(learningWorldObject);

    await systemUnderTest.executeAsync();

    expect(entityContainerMock.createEntity).toHaveBeenLastCalledWith(
      learningWorldObject,
      LearningWorldEntity
    );

    expect(learningWorldPortMock.presentLearningWorld).toHaveBeenCalledWith(
      learningWorldObject
    );
  });
});
