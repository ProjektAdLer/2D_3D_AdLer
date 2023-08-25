import { expectedSpaceTO } from "./../../../../Adapters/BackendAdapter/BackendResponses";
import {
  SubmittedAnswersTO,
  EvaluationAnswerTO,
} from "./../../../../../Core/Application/DataTransferObjects/QuizElementTO";
import { mock } from "jest-mock-extended";
import SubmitSelectionUseCase from "../../../../../Core/Application/UseCases/Adaptability/SubmitSelectionUseCase/SubmitSelectionUseCase";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import { StyledButtonColor } from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledButton";

const worldPortMock = mock<ILearningWorldPort>();

describe("SubmitSelectionUseCase", () => {
  let systemUnderTest: SubmitSelectionUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(SubmitSelectionUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls executeAsync on the SubmitSelectionUseCase", () => {
    const submitted: SubmittedAnswersTO = {
      questionID: 2,
      selectedAnswerIndexes: [1, 3],
      allAnswerIndexes: [1, 2, 3, 4],
    };

    const mappedValues: Map<number, StyledButtonColor> = new Map([
      [1, "success"],
      [3, "success"],
    ]);

    systemUnderTest.executeAsync(submitted);
    expect(worldPortMock.onAdaptivityElementSubmitted).toBeCalledTimes(1);
    expect(worldPortMock.onAdaptivityElementSubmitted).toBeCalledWith({
      questionID: 2,
      evaluation: mappedValues,
    } as EvaluationAnswerTO);
  });
});
