import LoadWorldUseCase from "../../../Core/Application/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import IBackend from "../../../Core/Adapters/Backend/IBackend";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../Core/Application/LoadWorld/ILearningWorldPort";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../Core/Ports/UIPort/IUIPort";
import UserDataEntity from "../../../Core/Domain/Entities/UserDataEntity";
import {
  correctFakeLearningElementResponse,
  correctFakeRoomResponse,
  correctFakeWorldResponse,
} from "../../Adapters/Backend/BackendResponses";
import EntityContainer from "../../../Core/Domain/EntityContainer/EntityContainer";

const backendMock = mock<IBackend>();
const learningWorldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const uiPortMock = mock<IUIPort>();

describe("LoadWorldUseCase", () => {
  let systemUnderTest: LoadWorldUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    backendMock.getLearningElements.mockResolvedValue(
      correctFakeLearningElementResponse
    );
    backendMock.getLearningRooms.mockResolvedValue(correctFakeRoomResponse);
    backendMock.getWorld.mockResolvedValue(correctFakeWorldResponse);

    CoreDIContainer.rebind(CORE_TYPES.IBackend).toConstantValue(backendMock);
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
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

  test("Displays error, if User is not logged in ", async () => {
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

  test.skip("Loads world, if correct Data is provided", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        userToken: "token",
        isLoggedIn: true,
      },
    ] as UserDataEntity[]);

    await systemUnderTest.executeAsync().catch((error) => {
      expect(error).toBeUndefined();
    });
  });
});
