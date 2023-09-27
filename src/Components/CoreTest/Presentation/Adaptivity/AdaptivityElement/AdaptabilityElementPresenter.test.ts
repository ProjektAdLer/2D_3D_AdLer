import AdaptivityElementProgressTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { EvaluationAnswerTO } from "../../../../Core/Application/DataTransferObjects/QuizElementTO";
import AdaptivityElementPresenter from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import { StyledButtonColor } from "../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledButton";

const adaptivityElementProgressTO: AdaptivityElementProgressTO = {
  isCompleted: false,
  tasks: [],
  introText: "",
  shuffleTask: false,
};

describe("AdaptivityElementPresenter", () => {
  let systemUnderTest: AdaptivityElementPresenter;

  beforeEach(() => {
    systemUnderTest = new AdaptivityElementPresenter(
      new AdaptivityElementViewModel()
    );
  });

  test("onAdaptivityElementLoaded sets isOpen to true", () => {
    systemUnderTest.onAdaptivityElementLoaded(adaptivityElementProgressTO);

    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
  });

  test("createFooterBreadcrumbs returns the correct string of names", () => {
    const contentData: AdaptivityElementContent = {
      elementName: "TestElement",
      introText: "",
      tasks: [
        {
          taskID: 1,
          taskTitle: "TestTask",
          questions: [
            {
              questionID: 1,
              questionText: "",
              questionAnswers: [],
              isRequired: false,
              isCompleted: false,
            },
          ],
          isCompleted: false,
        },
      ],
    };
    systemUnderTest["viewModel"].contentData.Value = contentData;
    systemUnderTest["viewModel"].currentTaskID.Value = 1;
    systemUnderTest["viewModel"].currentQuestionID.Value = 1;

    const result = systemUnderTest["createFooterBreadcrumbs"]();

    // TODO: extend expected result when question title is implemented
    expect(result).toBe("TestElement => TestTask");
  });

  test("createContentData returns the correct content data", () => {
    const adaptivityElementProgressTO: AdaptivityElementProgressTO = {
      isCompleted: false,
      tasks: [
        {
          taskId: 1,
          taskTitle: "",
          taskOptional: false,
          questions: [
            {
              questionId: 1,
              questionText: "",
              questionType: "",
              trigger: [],
              questionAnswers: [
                {
                  answerId: 1,
                  answerText: "",
                },
              ],
              questionDifficulty: 1,
              isCompleted: false,
            },
          ],
          requieredDifficulty: 1,
          isCompleted: false,
        },
      ],
      introText: "",
      shuffleTask: false,
    };

    const result = systemUnderTest["createContentData"](
      adaptivityElementProgressTO
    );

    expect(result).toStrictEqual({
      // TODO: remove placeholder name
      elementName: "PLACEHOLDER_NAME",
      introText: "",
      tasks: [
        {
          taskID: 1,
          taskTitle: "",
          questions: [
            {
              questionID: 1,
              questionText: "",
              questionAnswers: [
                {
                  answerIndex: 1,
                  answerText: "",
                  isSelected: false,
                },
              ],
              isRequired: true,
              isCompleted: false,
            },
          ],
          isCompleted: false,
        },
      ],
    });
  });

  test("onAdaptivityElementSubmitted should set evaluation in viewModel", () => {
    const mappedValues: Map<number, StyledButtonColor> = new Map([
      [1, "success"],
      [2, "success"],
    ]);
    const evaluate: EvaluationAnswerTO = {
      questionID: 1,
      evaluation: mappedValues,
    };

    systemUnderTest.onAdaptivityElementSubmitted(evaluate);

    expect(systemUnderTest["viewModel"].evaluation.Value).toEqual(
      evaluate.evaluation
    );
  });
});
