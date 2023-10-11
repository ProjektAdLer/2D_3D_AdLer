import { SubmittedAnswersTO } from "../../../../Core/Application/DataTransferObjects/QuizElementTO";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementController from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementController";
import AdaptivityElementViewModel, {
  AdaptivityQuestion,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import ISubmitAdaptivityElementSelectionUseCase from "../../../../Core/Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";
import exp from "constants";

const submitSelectionUseCaseMock =
  mock<ISubmitAdaptivityElementSelectionUseCase>();
const viewModel = new AdaptivityElementViewModel();

describe("AdaptivityElementController", () => {
  let systemUnderTest: AdaptivityElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).toConstantValue(submitSelectionUseCaseMock);
  });

  beforeEach(() => {
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
  test("back sets viewModel Data correctly", () => {
    viewModel.currentTaskID.Value = 1;
    viewModel.currentQuestionID.Value = null;
    systemUnderTest.back();
    expect(viewModel.currentTaskID.Value).toBe(null);
    expect(viewModel.currentQuestionID.Value).toBe(null);

    viewModel.currentTaskID.Value = 1;
    viewModel.currentQuestionID.Value = 1;
    systemUnderTest.back();
    expect(viewModel.currentTaskID.Value).toBe(1);
    expect(viewModel.currentQuestionID.Value).toBe(null);
  });

  test.skip("selectTask sets currentTaskID in viewModel", () => {
    systemUnderTest.selectTask(1);
    expect(viewModel.currentTaskID.Value).toBe(1);
  });

  test.skip("submitSelection calls SubmitSelectionUseCase", () => {
    let submit = {
      questionID: 2,
      selectedAnswerIndexes: [1, 3],
      allAnswerIndexes: [1, 2, 3, 4],
    } as SubmittedAnswersTO;

    let element = {
      questionID: 2,
      questionText: "",
      questionPoints: 1,
      questionAnswers: [
        { answerIndex: 1, answerText: "", isSelected: true },
        { answerIndex: 2, answerText: "", isSelected: false },
        { answerIndex: 3, answerText: "", isSelected: true },
        { answerIndex: 4, answerText: "", isSelected: false },
      ],
    } as AdaptivityQuestion;

    viewModel.currentElement.Value = element;

    systemUnderTest.submitSelection();
    expect(submitSelectionUseCaseMock.executeAsync).toBeCalledWith(submit);
  });
});
