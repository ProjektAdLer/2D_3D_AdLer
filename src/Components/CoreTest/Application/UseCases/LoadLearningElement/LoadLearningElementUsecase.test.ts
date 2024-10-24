import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LoadLearningElementUseCase from "../../../../Core/Application/UseCases/LoadLearningElement/LoadLearningElementUseCase";
import IGetLearningElementSourceUseCase from "../../../../Core/Application/UseCases/GetLearningElementSource/IGetLearningElementSourceUseCase";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { NotificationMessages } from "../../../../Core/Domain/Types/NotificationMessages";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getElementSourceUseCaseMock = mock<IGetLearningElementSourceUseCase>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const notificationPortMock = mock<INotificationPort>();

describe("LoadLearningElementUseCase", () => {
  let systemUnderTest: LoadLearningElementUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetLearningElementSourceUseCase,
    ).toConstantValue(getElementSourceUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadLearningElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls executeAsync on the GetLearningElementUseCase", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([{}]);
    getElementSourceUseCaseMock.internalExecuteAsync.mockResolvedValue("path");

    systemUnderTest.executeAsync({ elementID: 1, isScoreable: true });

    expect(getElementSourceUseCaseMock.internalExecuteAsync).toBeCalledTimes(1);
  });

  test("calls the port with the TO", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([{}]);
    getElementSourceUseCaseMock.internalExecuteAsync.mockResolvedValue("path");

    await systemUnderTest.executeAsync({ elementID: 1, isScoreable: true });

    expect(worldPortMock.onLearningElementLoaded).toHaveBeenCalledWith({
      id: 1,
      filePath: "path",
      isScoreable: true,
    });
  });

  test("should throw, if the LearningElement is not found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync({ elementID: 2, isScoreable: true });

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      `Could not find element with ID 2 in world 1`,
      NotificationMessages.ELEMENT_NOT_FOUND,
    );
  });

  test("should throw, if more than one LearningElement is found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
      {
        id: 1,
      },
    ]);

    await systemUnderTest.executeAsync({ elementID: 1, isScoreable: true });

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      `Found more than one element with ID 1 in world 1`,
      NotificationMessages.ELEMENT_NOT_UNIQUE,
    );
  });

  test("element filter callback should return a boolean", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      <T>(
        entityType: ConstructorReference<T>,
        filter: (entity: T) => boolean,
      ) => {
        filterReturn = filter(new entityType());
        return [
          {
            elements: [],
          },
        ];
      },
    );
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        worldID: 1,
      },
    ]);

    await systemUnderTest.executeAsync({ elementID: 1, isScoreable: true });

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });

  test("should throw, if the User is not in a Space", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      worldID: 1,
      spaceID: undefined,
    } as UserLocationTO);

    await systemUnderTest.executeAsync({ elementID: 2, isScoreable: true });

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      `LoadLearningElementUseCase: User is not in a space!`,
      NotificationMessages.USER_NOT_IN_SPACE,
    );
  });
});
