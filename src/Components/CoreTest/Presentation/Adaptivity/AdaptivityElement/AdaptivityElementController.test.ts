import { SubmittedAnswersTO } from "../../../../Core/Application/DataTransferObjects/QuizElementTO";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementController from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementController";
import AdaptivityElementViewModel, {
  AdaptivityQuestion,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import ISubmitAdaptivityElementSelectionUseCase from "../../../../Core/Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";

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

  test("selectTask sets currentTaskID in viewModel", () => {
    systemUnderTest.selectTask(1);
    expect(viewModel.currentTaskID.Value).toBe(1);
  });

  test("selectQuestion sets currentQuestionID in viewModel", () => {
    systemUnderTest.selectQuestion(1);
    expect(viewModel.currentQuestionID.Value).toBe(1);
  });

  test("submitSelection calls SubmitSelectionUseCase", () => {
    viewModel.elementID.Value = 42;
    viewModel.currentTaskID.Value = 42;
    viewModel.currentQuestionID.Value = 42;

    systemUnderTest.submitSelection([1, 3]);

    expect(submitSelectionUseCaseMock.executeAsync).toBeCalledWith({
      elementID: 42,
      taskID: 42,
      questionID: 42,
      selectedAnswerIDs: [1, 3],
    });
  });

  test("closeFeedback sets showFeedback to false and currentQuestionID to null", () => {
    viewModel.showFeedback.Value = true;
    viewModel.currentQuestionID.Value = 1;
    systemUnderTest.closeFeedback();
    expect(viewModel.showFeedback.Value).toBeFalsy();
    expect(viewModel.currentQuestionID.Value).toBe(null);
  });

  test("closeAnswerSelection sets currentQuestionID to null", () => {
    viewModel.currentQuestionID.Value = 1;
    systemUnderTest.closeAnswerSelection();
    expect(viewModel.currentQuestionID.Value).toBe(null);
  });
});
