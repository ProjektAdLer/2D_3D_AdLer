import HandleStoryNPCExitUseCase from "../../../../Core/Application/UseCases/HandleStoryNPCExit/HandleStoryNPCExitUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { mock } from "jest-mock-extended";

const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const loggerMock = mock<ILoggerPort>();
const doorPresenterMock1 = mock<IDoorPresenter>();
const doorPresenterMock2 = mock<IDoorPresenter>();

describe("HandleStoryNPCExitUseCase", () => {
  let systemUnderTest: HandleStoryNPCExitUseCase;
  let originalGetAll: typeof CoreDIContainer.getAll;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IGetUserLocationUseCase>(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);

    CoreDIContainer.rebind<ILoggerPort>(CORE_TYPES.ILogger).toConstantValue(
      loggerMock,
    );

    // Mock CoreDIContainer.getAll method
    originalGetAll = CoreDIContainer.getAll;
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(HandleStoryNPCExitUseCase);
    jest.resetAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    CoreDIContainer.getAll = originalGetAll;
  });

  test("logs warning and returns early when user is not in a space", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = undefined;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    await systemUnderTest.executeAsync({ storyType: StoryElementType.Intro });

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "HandleStoryNPCExitUseCase: User is not in a space!",
    );
  });

  test("logs warning and returns early when no exit door is found", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 123;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    // Mock no doors found
    CoreDIContainer.getAll = jest.fn().mockReturnValue([]);

    await systemUnderTest.executeAsync({ storyType: StoryElementType.Intro });

    expect(CoreDIContainer.getAll).toHaveBeenCalledWith(
      PRESENTATION_TYPES.IDoorPresenter,
    );
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "HandleStoryNPCExitUseCase: No exit door found for space 123",
    );
  });

  test("logs warning and returns early when no exit door matches space", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 123;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    // Mock door that doesn't match criteria
    doorPresenterMock1.isExit.mockReturnValue(false);
    doorPresenterMock1.belongsToSpace.mockReturnValue(true);

    CoreDIContainer.getAll = jest.fn().mockReturnValue([doorPresenterMock1]);

    await systemUnderTest.executeAsync({ storyType: StoryElementType.Intro });

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "HandleStoryNPCExitUseCase: No exit door found for space 123",
    );
  });

  test("successfully opens and closes exit door when exit door is found", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 123;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    // Mock exit door that matches criteria
    doorPresenterMock1.isExit.mockReturnValue(true);
    doorPresenterMock1.belongsToSpace.mockReturnValue(true);
    doorPresenterMock1.open.mockImplementation((callback) => {
      if (callback) callback();
    });

    CoreDIContainer.getAll = jest.fn().mockReturnValue([doorPresenterMock1]);

    // Use jest fake timers to control setTimeout
    jest.useFakeTimers();

    const promise = systemUnderTest.executeAsync({
      storyType: StoryElementType.Intro,
    });

    // Fast-forward time
    jest.advanceTimersByTime(100);

    await promise;

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.INFO,
      "HandleStoryNPCExitUseCase: Opening exit door for story type Intro in space 123",
    );
    expect(doorPresenterMock1.open).toHaveBeenCalledTimes(1);
    expect(doorPresenterMock1.close).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("finds correct exit door among multiple doors", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 123;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    // Mock multiple doors - only one matches both criteria
    doorPresenterMock1.isExit.mockReturnValue(false);
    doorPresenterMock1.belongsToSpace.mockReturnValue(true);

    doorPresenterMock2.isExit.mockReturnValue(true);
    doorPresenterMock2.belongsToSpace.mockReturnValue(true);
    doorPresenterMock2.open.mockImplementation((callback) => {
      if (callback) callback();
    });

    CoreDIContainer.getAll = jest
      .fn()
      .mockReturnValue([doorPresenterMock1, doorPresenterMock2]);

    jest.useFakeTimers();

    const promise = systemUnderTest.executeAsync({
      storyType: StoryElementType.Outro,
    });

    jest.advanceTimersByTime(100);

    await promise;

    expect(doorPresenterMock1.open).not.toHaveBeenCalled();
    expect(doorPresenterMock2.open).toHaveBeenCalledTimes(1);
    expect(doorPresenterMock2.close).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.INFO,
      "HandleStoryNPCExitUseCase: Opening exit door for story type Outro in space 123",
    );

    jest.useRealTimers();
  });

  test("works with different story types", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 456;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    doorPresenterMock1.isExit.mockReturnValue(true);
    doorPresenterMock1.belongsToSpace.mockReturnValue(true);
    doorPresenterMock1.open.mockImplementation((callback) => {
      if (callback) callback();
    });

    CoreDIContainer.getAll = jest.fn().mockReturnValue([doorPresenterMock1]);

    jest.useFakeTimers();

    const promise = systemUnderTest.executeAsync({
      storyType: StoryElementType.IntroOutro,
    });

    jest.advanceTimersByTime(100);

    await promise;

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.INFO,
      "HandleStoryNPCExitUseCase: Opening exit door for story type IntroOutro in space 456",
    );

    jest.useRealTimers();
  });

  test("filters doors by space ID correctly", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 789;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    // Mock door that is exit but belongs to different space
    doorPresenterMock1.isExit.mockReturnValue(true);
    doorPresenterMock1.belongsToSpace.mockImplementation(
      (spaceID) => spaceID !== 789,
    );

    // Mock door that belongs to correct space and is exit
    doorPresenterMock2.isExit.mockReturnValue(true);
    doorPresenterMock2.belongsToSpace.mockImplementation(
      (spaceID) => spaceID === 789,
    );
    doorPresenterMock2.open.mockImplementation((callback) => {
      if (callback) callback();
    });

    CoreDIContainer.getAll = jest
      .fn()
      .mockReturnValue([doorPresenterMock1, doorPresenterMock2]);

    jest.useFakeTimers();

    const promise = systemUnderTest.executeAsync({
      storyType: StoryElementType.None,
    });

    jest.advanceTimersByTime(100);

    await promise;

    expect(doorPresenterMock1.belongsToSpace).toHaveBeenCalledWith(789);
    expect(doorPresenterMock2.belongsToSpace).toHaveBeenCalledWith(789);
    expect(doorPresenterMock1.open).not.toHaveBeenCalled();
    expect(doorPresenterMock2.open).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
