import { NotificationMessages } from "./../../../../../Core/Domain/Types/NotificationMessages";
import AdaptivityElementEntity from "../../../../../Core/Domain/Entities/Adaptivity/AdaptivityElementEntity";
import LoadAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/LoadAdaptivityElementUseCase";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILoadAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../../Core/Application/DataTransferObjects/UserLocationTO";
import LearningElementEntity from "../../../../../Core/Domain/Entities/LearningElementEntity";
import IGetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import Logger from "../../../../../Core/Adapters/Logger/Logger";
import INotificationPort from "../../../../../Core/Application/Ports/Interfaces/INotificationPort";
import { AxiosError } from "axios";

const loggerMock = mock<Logger>();
const notificationPortMock = mock<INotificationPort>();
const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const getAdaptivityElementStatusUseCaseMock =
  mock<IGetAdaptivityElementStatusUseCase>();

const learningElement = {
  id: 0,
  value: 0,
  hasScored: false,
  name: "abc",
  description: "",
  goals: [],
  type: "adaptivity",
  model: "" as unknown,
  parentWorldID: 1,
} as LearningElementEntity;

describe("LoadAdaptivityElementUseCase", () => {
  let systemUnderTest: ILoadAdaptivityElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetAdaptivityElementStatusUseCase,
    ).toConstantValue(getAdaptivityElementStatusUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort,
    ).toConstantValue(notificationPortMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadAdaptivityElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [EZZ0013]
  test("should call notificationport if user is not in learningspace", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: undefined,
    } as UserLocationTO);
    await systemUnderTest.executeAsync(0);
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledTimes(
      1,
    );
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      "WARN",
      `LoadAdaptivityElementUseCase: User is not in a space!`,
      "User is not in a space!",
    );
  });

  test("should call NotificationPort if AdpativityElement is not found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    await systemUnderTest.executeAsync(0);
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledTimes(
      1,
    );
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      "WARN",
      "Could not find element with ID 0 in world 1",
      "Could not find element!",
    );
  });

  test("should call NotificationPort if more than one AdaptivityElement is found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      { id: 0 },
      { id: 0 },
    ]);
    await systemUnderTest.executeAsync(0);
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledTimes(
      1,
    );
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      "WARN",
      "Found more than one element with ID 0 in world 1",
      "Found more than one element!",
    );
  });

  test("filterEntitiesOfType should return true when query is correct", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);

    const adaptivityElementEntityMock = {
      element: {
        id: 0,
        parentWorldID: 1,
      } as LearningElementEntity,
    } as AdaptivityElementEntity;
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (entityType, callback) => {
        filterResult = callback(
          adaptivityElementEntityMock as AdaptivityElementEntity,
        );
        return [adaptivityElementEntityMock];
      },
    );

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.executeAsync(0);

    expect(filterResult).toBe(true);
  });

  // ANF-ID: [EWE0013]
  test("calls port onAdaptivityElementLoaded", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 0,
        element: learningElement,
        introText: "",
        shuffleTask: false,
        tasks: [],
        parentWorldID: 1,
      } as AdaptivityElementEntity,
    ]);

    getAdaptivityElementStatusUseCaseMock.internalExecuteAsync.mockResolvedValue();

    await systemUnderTest.executeAsync(0);
    expect(worldPortMock.onAdaptivityElementLoaded).toHaveBeenCalled();
  });

  test("catches exception of getAdaptivityElementStatusUseCase and throws error again", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 0,
        element: learningElement,
        introText: "",
        shuffleTask: false,
        tasks: [],
        parentWorldID: 1,
      } as AdaptivityElementEntity,
    ]);

    getAdaptivityElementStatusUseCaseMock.internalExecuteAsync.mockRejectedValue(
      new Error(NotificationMessages.USER_NOT_IN_SPACE),
    );

    await expect(systemUnderTest.executeAsync(0)).rejects.toThrow(
      NotificationMessages.USER_NOT_IN_SPACE,
    );
  });
});
