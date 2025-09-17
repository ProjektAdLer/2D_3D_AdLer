import { AdaptivityElementContent } from "./../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
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
import IDisplayLearningElementUseCase from "../../../../Core/Application/UseCases/Adaptivity/DisplayAdaptivityHintLearningElement/IDisplayAdaptivityHintLearningElementUseCase";
import ILoadExternalLearningElementUseCase from "../../../../Core/Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/ILoadExternalLearningElementUseCase";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { Observable } from "@babylonjs/core";
import IBeginStoryElementOutroCutSceneUseCase from "../../../../Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";

const submitSelectionUseCaseMock =
  mock<ISubmitAdaptivityElementSelectionUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const displayLearningElmentUseCaseMock = mock<IDisplayLearningElementUseCase>();
const loadExternalLearningElementUseCaseMock =
  mock<ILoadExternalLearningElementUseCase>();
const beginStoryElementOutroCutSceneMock =
  mock<IBeginStoryElementOutroCutSceneUseCase>();

const mockHint: AdaptivityHint = {
  hintID: 1,
  showOnIsWrong: false,
  hintAction: {
    hintActionType: AdaptivityElementActionTypes.ReferenceAction,
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
      isCorrect: true,
    },
    {
      answerIndex: 3,
      answerText: "TestAnswerText",
      isSelected: true,
      isCorrect: false,
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
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase,
    ).toConstantValue(submitSelectionUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IDisplayAdaptivityHintLearningElementUseCase,
    ).toConstantValue(displayLearningElmentUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadExternalLearningElementUseCase,
    ).toConstantValue(loadExternalLearningElementUseCaseMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(mock());
    CoreDIContainer.rebind(
      USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase,
    ).toConstantValue(beginStoryElementOutroCutSceneMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).toConstantValue(mock());
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

  // ANF-ID: [EWE0042]
  test("closeModal calls beginStoryElementOutroCutSceneUseCase", () => {
    systemUnderTest.closeModal();
    expect(
      systemUnderTest["beginStoryElementOutroCutSceneUseCase"].execute,
    ).toHaveBeenCalledWith({
      scoredLearningElementID: viewModel.elementID.Value,
    });
  });

  test("back always resets currentQuestionID and showFeedback in viewmodel", () => {
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

  // ANF-ID: [EWE0006, EWE0007]
  test("selectHint calls displayAdaptivityHintLearningElementUseCase if hint is reference (learning element)", async () => {
    await systemUnderTest.selectHint(mockHint, mockQuestion);
    expect(displayLearningElmentUseCaseMock.executeAsync).toBeCalledWith(42);
  });

  // ANF-ID: [EWE0044]
  test("selectHint calls loadExternalLearningElementUseCase if hint is contentreference (external learning element)", async () => {
    let contentQuestion = mockQuestion;
    contentQuestion.hints[0].hintAction.hintActionType =
      AdaptivityElementActionTypes.ContentAction;
    await systemUnderTest.selectHint(contentQuestion.hints[0], contentQuestion);
    expect(
      loadExternalLearningElementUseCaseMock.executeAsync,
    ).toHaveBeenCalled();
  });

  test("selectHint sets viewmodels currentQuestion to associated question", async () => {
    viewModel.selectedHint = new Observable<AdaptivityQuestion>();
    viewModel.selectedHint.Value = {
      questionID: 0,
      questionText: "test",
    };
    await systemUnderTest.selectHint(mockHint, mockQuestion);
    expect(viewModel.currentQuestion.Value).toBe(mockQuestion);
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

  test("closeHint sets selectedHint and currentQuestion to null", () => {
    viewModel.currentQuestion.Value = mockQuestion;
    viewModel.selectedHint.Value = mockHint;

    systemUnderTest.closeHint();

    expect(viewModel.currentQuestion.Value).toBe(null);
    expect(viewModel.selectedHint.Value).toBe(null);
  });

  test("showFooterTooltip sets showFooterTooltip to false, if it was true before", () => {
    viewModel.showFooterTooltip.Value = true;

    systemUnderTest.showFooterTooltip();

    expect(viewModel.showFooterTooltip.Value).toBeFalsy();
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

  test("loadExternalContentReference handles error and sets hint if loadExternalLearningElementUseCase throw exception because no external element could be found", async () => {
    const mockElementID = 1;
    loadExternalLearningElementUseCaseMock.executeAsync.mockImplementation(
      () => {
        throw new Error(
          `Could not find element with ID ${mockElementID} in world 0`,
        );
      },
    );
    systemUnderTest.loadExternalContentReference(mockElementID, mockQuestion);
    expect(viewModel.selectedHint.Value).toEqual({
      hintID: -1,
      showOnIsWrong: true,
      hintAction: {
        hintActionType: AdaptivityElementActionTypes.CommentAction,
        textData:
          "Der hier hinterlegte Hinweis existiert leider nicht. Bitte füllen Sie einen Bugreport aus.",
      },
    } as AdaptivityHint);
  });

  test("loadExternalContentReference handles error and sets hint if loadExternalLearningElementUseCase throw exception because more than one external element was found", async () => {
    loadExternalLearningElementUseCaseMock.executeAsync.mockImplementation(
      () => {
        throw new Error(`Found more than one element with ID`);
      },
    );
    systemUnderTest.loadExternalContentReference(1, mockQuestion);
    expect(viewModel.selectedHint.Value).toEqual({
      hintID: -1,
      showOnIsWrong: true,
      hintAction: {
        hintActionType: AdaptivityElementActionTypes.CommentAction,
        textData:
          "Der hier hinterlegte Hinweis ist nicht eindeutig zuordbar. Bitte füllen Sie einen Bugreport aus.",
      },
    } as AdaptivityHint);
  });

  test("reset sets every task and question to not completed", () => {
    viewModel.contentData = new Observable<AdaptivityElementContent>();
    viewModel.contentData.Value = {
      elementName: "",
      introText: "",
      tasks: [mockTask],
    } as AdaptivityElementContent;
    //viewModel.contentData.Value.tasks = [mockTask] as AdaptivityTask[];
    viewModel.contentData.Value.tasks[0].isCompleted = true;
    viewModel.contentData.Value.tasks[0].questions[0].isCompleted = true;

    systemUnderTest.reset();

    expect(viewModel.contentData.Value.tasks[0].isCompleted).toEqual(null);
    expect(
      viewModel.contentData.Value.tasks[0].questions[0].isCompleted,
    ).toEqual(null);
  });
});
