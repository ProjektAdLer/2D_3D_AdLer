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
import { AdaptivityElementBackendQuestionResponse } from "../../../../../Core/Adapters/BackendAdapter/Types/BackendResponseTypes";
import AdaptivityElementProgressUpdateTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import { AdaptivityElementStatusTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const backendPortMock = mock<IBackendPort>();

describe("SubmitAdaptivityElementSelectionUseCase", () => {
  let systemUnderTest: SubmitAdaptivityElementSelectionUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      SubmitAdaptivityElementSelectionUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls executeAsync on the SubmitSelectionUseCase", async () => {
    const submitted: AdaptivityElementQuestionSubmissionTO = {
      worldID: 0,
      elementID: 1,
      taskID: 2,
      questionID: 3,
      selectedAnswerIDs: [1, 2],
    };

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
        answer: [{ checked: true, correct: true }],
      },
    } as AdaptivityElementBackendQuestionResponse);

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
