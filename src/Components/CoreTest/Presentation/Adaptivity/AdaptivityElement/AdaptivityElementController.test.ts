import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementController from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementController";
import AdaptivityElementViewModel, {
  AdaptivityHint,
  AdaptivityQuestion,
  AdaptivityTask,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import ISubmitAdaptivityElementSelectionUseCase from "../../../../Core/Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { AdaptivityElementActionTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import IDisplayLearningElementUseCase from "../../../../Core/Application/UseCases/Adaptivity/DisplayLearningElementUseCase/IDisplayLearningElementUseCase";

const submitSelectionUseCaseMock =
  mock<ISubmitAdaptivityElementSelectionUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const displayLearningElmentUseCaseMock = mock<IDisplayLearningElementUseCase>();

const mockHint: AdaptivityHint = {
  hintID: 1,
  showOnIsWrong: false,
  hintAction: {
    hintActionType: 1,
    idData: 42,
    textData: "TestHintActionData",
  },
};
const mockQuestion: AdaptivityQuestion = {
  questionID: 1,
  questionText: "TestQuestionText",
  questionAnswers: [
    {
      answerIndex: 1,
      answerText: "TestAnswerText",
      isSelected: false,
    },
    {
      answerIndex: 3,
      answerText: "TestAnswerText",
      isSelected: true,
    },
  ],
  isRequired: false,
  isCompleted: false,
  difficulty: 1,
  isMultipleChoice: false,
  hints: [mockHint],
};
const mockTask: AdaptivityTask = {
  taskID: 1,
  taskTitle: "TestTaskTitle",
  questions: [mockQuestion],
  isCompleted: false,
  requiredDifficulty: 1,
  isRequired: false,
  hasBeenCompleted: false,
};

describe("AdaptivityElementController", () => {
  let systemUnderTest: AdaptivityElementController;
  let viewModel: AdaptivityElementViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).toConstantValue(submitSelectionUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IDisplayLearningElementUseCase
    ).toConstantValue(displayLearningElmentUseCaseMock);
  });

  beforeEach(() => {
    viewModel = new AdaptivityElementViewModel();
    systemUnderTest = new AdaptivityElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("closeModal sets isOpen in viewModel to false", () => {
    viewModel.isOpen.Value = true;
    systemUnderTest.closeModal();
    expect(viewModel.isOpen.Value).toBeFalsy();
  });

  test("back allways resets currentQuestionID and showFeedback in viewmodel", () => {
    viewModel.currentTask.Value = mockTask;
    viewModel.currentQuestion.Value = mockQuestion;
    viewModel.showFeedback.Value = true;

    systemUnderTest.back();

    expect(viewModel.currentTask.Value).toBe(mockTask);
    expect(viewModel.currentQuestion.Value).toBe(null);
    expect(viewModel.showFeedback.Value).toBeFalsy();
  });

  test("back resets currentTaskID when currentQuestionID is null", () => {
    viewModel.currentTask.Value = mockTask;

    viewModel.currentQuestion.Value = null;

    systemUnderTest.back();

    expect(viewModel.currentTask.Value).toBe(null);
  });

  test("selectTask sets currentTaskID in viewModel", () => {
    systemUnderTest.selectTask(mockTask);
    expect(viewModel.currentTask.Value).toBe(mockTask);
  });

  test("selectQuestion sets currentQuestionID in viewModel", () => {
    systemUnderTest.selectQuestion(mockQuestion);
    expect(viewModel.currentQuestion.Value).toBe(mockQuestion);
  });

  test("selectHint sets currentQuestionID and selectedHintID in viewModel", async () => {
    await systemUnderTest.selectHint(mockHint, mockQuestion);
    expect(viewModel.currentQuestion.Value).toBe(mockQuestion);
    expect(viewModel.selectedHint.Value).toBe(mockHint);
  });

  test("selectHint calls worldPort.onLearningElementHighlighted with hintActionData", async () => {
    const hint: AdaptivityHint = {
      hintID: 1,
      showOnIsWrong: false,
      hintAction: {
        hintActionType: AdaptivityElementActionTypes.ReferenceAction,
        idData: 42,
        textData: "TestHintActionData",
      },
    };

    await systemUnderTest.selectHint(hint, mockQuestion);

    expect(worldPortMock.onLearningElementHighlighted).toBeCalledWith(42);
  });

  test("submitSelection calls SubmitSelectionUseCase", () => {
    viewModel.elementID.Value = 42;
    viewModel.currentTask.Value = mockTask;
    viewModel.currentQuestion.Value = {
      ...mockQuestion,
      questionAnswers: [
        { ...mockQuestion.questionAnswers[0], isSelected: false },
        { ...mockQuestion.questionAnswers[1], isSelected: true },
      ],
    };

    systemUnderTest.submitSelection();

    expect(submitSelectionUseCaseMock.executeAsync).toBeCalledWith({
      elementID: 42,
      taskID: 1,
      questionID: 1,
      selectedAnswers: [false, true],
    });
  });

  test("closeFeedback sets showFeedback to false and currentQuestionID to null", () => {
    viewModel.showFeedback.Value = true;
    viewModel.currentQuestion.Value = mockQuestion;

    systemUnderTest.closeFeedback();

    expect(viewModel.showFeedback.Value).toBeFalsy();
    expect(viewModel.currentQuestion.Value).toBe(null);
  });

  test("closeAnswerSelection sets currentQuestionID to null", () => {
    viewModel.currentQuestion.Value = mockQuestion;

    systemUnderTest.closeAnswerSelection();

    expect(viewModel.currentQuestion.Value).toBe(null);
  });

  test("showFooterTooltip sets showFooterTooltip to true", () => {
    viewModel.showFooterTooltip.Value = false;

    systemUnderTest.showFooterTooltip();

    expect(viewModel.showFooterTooltip.Value).toBeTruthy();
  });

  test("hideFooterTooltip sets showFooterTooltip to false", () => {
    viewModel.showFooterTooltip.Value = true;

    systemUnderTest.hideFooterTooltip();

    expect(viewModel.showFooterTooltip.Value).toBeFalsy();
  });
});
