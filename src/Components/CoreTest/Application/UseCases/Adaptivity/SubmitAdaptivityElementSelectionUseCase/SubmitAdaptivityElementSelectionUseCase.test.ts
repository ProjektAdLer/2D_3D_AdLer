import { mock } from "jest-mock-extended";
import SubmitAdaptivityElementSelectionUseCase from "../../../../../Core/Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/SubmitAdaptivityElementSelectionUseCase";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import AdaptivityElementQuestionSubmissionTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import IBackendPort from "../../../../../Core/Application/Ports/Interfaces/IBackendPort";
import UserDataEntity from "../../../../../Core/Domain/Entities/UserDataEntity";
import AdaptivityElementProgressUpdateTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import { AdaptivityElementStatusTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../../Core/Application/DataTransferObjects/UserLocationTO";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementQuestionResponse from "../../../../../Core/Adapters/BackendAdapter/Types/AdaptivityElementQuestionResponse";
import IScoreAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/ScoreAdaptivityElementUseCase/IScoreAdaptivityElementUseCase";
import INotificationPort from "../../../../../Core/Application/Ports/Interfaces/INotificationPort";
import { LogLevelTypes } from "../../../../../Core/Domain/Types/LogLevelTypes";
import { NotificationMessages } from "../../../../../Core/Domain/Types/NotificationMessages";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const backendPortMock = mock<IBackendPort>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const scoreAdaptivityElementUseCaseMock =
  mock<IScoreAdaptivityElementUseCase>();
const notificationPortMock = mock<INotificationPort>();

const submitted: AdaptivityElementQuestionSubmissionTO = {
  elementID: 1,
  taskID: 2,
  questionID: 3,
  selectedAnswers: [true, true],
};

describe("SubmitAdaptivityElementSelectionUseCase", () => {
  let systemUnderTest: SubmitAdaptivityElementSelectionUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IScoreAdaptivityElementUseCase,
    ).toConstantValue(scoreAdaptivityElementUseCaseMock);

    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      SubmitAdaptivityElementSelectionUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call notificationport if worldID is not set", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {} as UserDataEntity,
    ]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: undefined,
      spaceID: 1,
    });

    await systemUnderTest.executeAsync(submitted);
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      `SubmitAdaptivityElementSelectionUseCase: User is not in a space!`,
      NotificationMessages.USER_NOT_IN_SPACE,
    );
  });

  test("should call notificationport if spaceID is not set", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {} as UserDataEntity,
    ]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: undefined,
    });

    await systemUnderTest.executeAsync(submitted);
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      `SubmitAdaptivityElementSelectionUseCase: User is not in a space!`,
      NotificationMessages.USER_NOT_IN_SPACE,
    );
  });

  test("should call notificationport if backendAdapter throws an error", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {} as UserDataEntity,
    ]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    backendPortMock.getAdaptivityElementQuestionResponse.mockRejectedValue(
      new Error("Backend Error"),
    );

    await systemUnderTest.executeAsync(submitted);
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      `SubmitAdaptivityElementSelectionUseCase: Error while submitting adaptivity element selection!`,
      NotificationMessages.BACKEND_ERROR,
    );
  });

  // ANF-ID: [EWE0005]
  test("calls ScoreAdaptivityElementUseCase when elementScore.success is true", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {} as UserDataEntity,
    ]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });
    backendPortMock.getAdaptivityElementQuestionResponse.mockResolvedValue({
      elementScore: {
        elementId: 1,
        success: true,
      },
      gradedTask: {
        taskId: 2,
        taskStatus: "Correct",
      },
      gradedQuestion: {
        id: 3,
        status: "Correct",
        answers: [{ checked: true, correct: true }],
      },
    } as AdaptivityElementQuestionResponse);

    await systemUnderTest.executeAsync(submitted);

    expect(scoreAdaptivityElementUseCaseMock.internalExecute).toBeCalledTimes(
      1,
    );
    expect(scoreAdaptivityElementUseCaseMock.internalExecute).toBeCalledWith(1);
  });

  // ANF-ID: [EWE0005]
  test("calls onAdaptivityElementAnswerEvaluated on world port", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        userToken: "",
        username: "",
        isLoggedIn: true,
      } as UserDataEntity,
    ]);

    backendPortMock.getAdaptivityElementQuestionResponse.mockResolvedValue({
      elementScore: {
        elementId: 1,
        success: true,
      },
      gradedTask: {
        taskId: 2,
        taskStatus: "Correct",
      },
      gradedQuestion: {
        id: 3,
        status: "Correct",
        answers: [{ checked: true, correct: true }],
      },
    } as AdaptivityElementQuestionResponse);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    await systemUnderTest.executeAsync(submitted);

    expect(worldPortMock.onAdaptivityElementAnswerEvaluated).toBeCalledTimes(1);
    expect(worldPortMock.onAdaptivityElementAnswerEvaluated).toBeCalledWith({
      elementInfo: { elementId: 1, success: true },
      taskInfo: {
        taskId: 2,
        taskStatus: AdaptivityElementStatusTypes.Correct,
      },
      questionInfo: {
        questionId: 3,
        questionStatus: AdaptivityElementStatusTypes.Correct,
      },
    } as AdaptivityElementProgressUpdateTO);
  });
});
