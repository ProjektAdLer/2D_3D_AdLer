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
  correctFakeLearningElementResponse,
  correctFakeRoomResponse,
  correctFakeWorldResponse,
} from "../../Adapters/Backend/BackendResponses";
import ILearningWorldPort from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import { APILearningElementTO } from "../../../Core/Adapters/Backend/APILearningElementTO";
import LearningElementEntity from "../../../Core/Domain/Entities/LearningElementEntity";
import H5PLearningElementData from "../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";

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

  test("MapLearningElement", () => {
    const functionUnderTest = systemUnderTest["mapLearningElement"];

    const input: APILearningElementTO = {
      id: 1,
      name: "Test",
      elementType: "h5p",
      value: [
        {
          type: "number",
          value: 1,
        },
      ],
      requirements: [
        {
          type: "number",
          value: 1,
        },
      ],
      metaData: [
        {
          key: "h5pFileName",
          value: "testFileName",
        },
        {
          key: "h5pContextId",
          value: "1337",
        },
      ],
    };
    functionUnderTest(input);

    const expected: Partial<LearningElementEntity> = {
      id: 1,
      name: "Test",
      value: 1,
      requirement: 1,
      learningElementData: {
        type: "h5p",
        contextId: 1337,
        fileName: "testFileName",
      } as H5PLearningElementData,
    };

    expect(entityContainerMock.createEntity).toHaveBeenCalledWith(
      expected,
      LearningElementEntity
    );
  });
});
