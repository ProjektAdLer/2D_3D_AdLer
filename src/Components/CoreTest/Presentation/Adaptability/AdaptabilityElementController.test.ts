import { SubmittedAnswersTO } from "./../../../Core/Application/DataTransferObjects/QuizElementTO";
import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AdaptabilityElementController from "../../../Core/Presentation/Adaptability/AdaptabilityElementController";
import ILoadQuizElementUseCase from "../../../Core/Application/UseCases/Adaptability/LoadQuizElementUseCase/ILoadQuizElementUseCase";
import AdaptabilityElementViewModel, {
  AdaptivityQuestion,
  QuizAnswer,
} from "../../../Core/Presentation/Adaptability/AdaptabilityElementViewModel";
import { generateAdaptivityContentsTO } from "../../../Core/Application/UseCases/Adaptability/LoadQuizElementUseCase/LoadQuizElementUseCase";
import ISubmitSelectionUseCase from "../../../Core/Application/UseCases/Adaptability/SubmitSelectionUseCase/ISubmitSelectionUseCase";

const worldPortMock = mock<ILearningWorldPort>();
const loadQuizElementUseCaseMock = mock<ILoadQuizElementUseCase>();
const submitSelectionUseCaseMock = mock<ISubmitSelectionUseCase>();
const viewModel = new AdaptabilityElementViewModel();

describe("AdaptivityElementController", () => {
  let systemUnderTest: AdaptabilityElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadQuizElementUseCase
    ).toConstantValue(loadQuizElementUseCaseMock);

    CoreDIContainer.rebind(
      USECASE_TYPES.ISubmitSelectionUseCase
    ).toConstantValue(submitSelectionUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = new AdaptabilityElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("loadAdaptivityElement calls loadQuizElementUseCase", () => {
    systemUnderTest.loadAdaptivityElement();
    expect(loadQuizElementUseCaseMock.executeAsync).toBeCalled();
  });

  test("submitSelection calls SubmitSelectionUseCase", () => {
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
