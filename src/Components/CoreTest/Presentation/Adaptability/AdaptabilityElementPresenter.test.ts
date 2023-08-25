import { StyledButtonColor } from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { AdaptivityContent } from "./../../../Core/Presentation/Adaptability/AdaptabilityElementViewModel";
import { AdaptivityContentsTO } from "./../../../Core/Application/DataTransferObjects/QuizElementTO";
import AdaptabilityElementPresenter from "../../../Core/Presentation/Adaptability/AdaptabilityElementPresenter";
import AdaptabilityElementViewModel from "../../../Core/Presentation/Adaptability/AdaptabilityElementViewModel";
import { EvaluationAnswerTO } from "../../../Core/Application/DataTransferObjects/QuizElementTO";

describe("AdaptabilityElementPresenter", () => {
  let systemUnderTest: AdaptabilityElementPresenter;

  beforeEach(() => {
    systemUnderTest = new AdaptabilityElementPresenter(
      new AdaptabilityElementViewModel()
    );
  });

  test("onAdaptabilityElementLoaded should set viewModel data", () => {
    const adaptivityTO: AdaptivityContentsTO = {
      shuffleQuestions: false,
      questions: [
        {
          questionID: 1,
          questionText: "text 1",
          questionPoints: 1,
          questionAnswers: [
            {
              answerIndex: 1,
              answerText: "answer 1.1",
            },
            {
              answerIndex: 2,
              answerText: "anser 1.2",
            },
          ],
        },
        {
          questionID: 2,
          questionText: "text 2",
          questionPoints: 1,
          questionAnswers: [
            {
              answerIndex: 1,
              answerText: "answer 2.1",
            },
            {
              answerIndex: 2,
              answerText: "anser 2.2",
            },
          ],
        },
      ],
    };

    systemUnderTest.onAdaptivityElementLoaded(adaptivityTO);

    const adaptivity: AdaptivityContent = {
      questions: [
        {
          questionID: 1,
          questionText: "text 1",
          questionPoints: 1,
          questionAnswers: [
            {
              answerIndex: 1,
              answerText: "answer 1.1",
              isSelected: false,
            },
            {
              answerIndex: 2,
              answerText: "anser 1.2",
              isSelected: false,
            },
          ],
        },
        {
          questionID: 2,
          questionText: "text 2",
          questionPoints: 1,
          questionAnswers: [
            {
              answerIndex: 1,
              answerText: "answer 2.1",
              isSelected: false,
            },
            {
              answerIndex: 2,
              answerText: "anser 2.2",
              isSelected: false,
            },
          ],
        },
      ],
    };

    expect(systemUnderTest["viewModel"].contentData.Value).toEqual(adaptivity);
    expect(systemUnderTest["viewModel"].currentElement.Value).toEqual({
      questionID: 1,
      questionText: "text 1",
      questionPoints: 1,
      questionAnswers: [
        {
          answerIndex: 1,
          answerText: "answer 1.1",
          isSelected: false,
        },
        {
          answerIndex: 2,
          answerText: "anser 1.2",
          isSelected: false,
        },
      ],
    });
  });

  const mappedValues: Map<number, StyledButtonColor> = new Map([
    [1, "success"],
    [2, "success"],
  ]);

  const evaluate: EvaluationAnswerTO = {
    questionID: 1,
    evaluation: mappedValues,
  };

  test("onAdaptivityElementSubmitted should set evaluation in viewModel", () => {
    systemUnderTest.onAdaptivityElementSubmitted(evaluate);

    expect(systemUnderTest["viewModel"].evaluation.Value).toEqual(
      evaluate.evaluation
    );
  });
});
