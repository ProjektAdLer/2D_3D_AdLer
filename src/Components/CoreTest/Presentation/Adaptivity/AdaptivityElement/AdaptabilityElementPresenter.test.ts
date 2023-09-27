import AdaptivityElementProgressTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { EvaluationAnswerTO } from "../../../../Core/Application/DataTransferObjects/QuizElementTO";
import AdaptivityElementPresenter from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import { StyledButtonColor } from "../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/StyledButton";

describe("AdaptivityElementPresenter", () => {
  let systemUnderTest: AdaptivityElementPresenter;
  let viewModel: AdaptivityElementViewModel;

  beforeEach(() => {
    viewModel = new AdaptivityElementViewModel();
    systemUnderTest = new AdaptivityElementPresenter(viewModel);
  });

  test("onAdaptivityElementLoaded sets isOpen to true", () => {
    const adaptivityElementProgressTO: AdaptivityElementProgressTO = {
      isCompleted: false,
      tasks: [
        {
          taskId: 1,
          taskTitle: "TestTaskTitle",
          taskOptional: false,
          questions: [
            {
              questionId: 1,
              questionText: "TestQuestionText",
              questionType: "",
              trigger: [],
              questionAnswers: [
                {
                  answerId: 1,
                  answerText: "TestAnswerText",
                },
              ],
              questionDifficulty: 1,
              isCompleted: false,
            },
          ],
          requiredDifficulty: 1,
          isCompleted: false,
        },
      ],
      introText: "",
      shuffleTask: false,
      elementName: "",
    };

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
              difficulty: 100,
            },
          ],
          isCompleted: false,
          requiredDifficulty: 100,
        },
      ],
    };
    systemUnderTest["viewModel"].contentData.Value = contentData;
    systemUnderTest["viewModel"].currentTaskID.Value = 1;
    systemUnderTest["viewModel"].currentQuestionID.Value = 1;

    systemUnderTest["setFooterBreadcrumbs"]();

    // TODO: extend expected result when question title is implemented
    expect(viewModel.footerText.Value).toBe("TestElement => TestTask");
  });

  test("createContentData returns the correct content data", () => {
    const adaptivityElementProgressTO: AdaptivityElementProgressTO = {
      isCompleted: false,
      tasks: [
        {
          taskId: 1,
          taskTitle: "TestTaskTitle",
          taskOptional: false,
          questions: [
            {
              questionId: 1,
              questionText: "TestQuestionText",
              questionType: "",
              trigger: [],
              questionAnswers: [
                {
                  answerId: 1,
                  answerText: "TestAnswerText",
                },
              ],
              questionDifficulty: 1,
              isCompleted: false,
            },
          ],
          requiredDifficulty: 1,
          isCompleted: false,
        },
      ],
      introText: "",
      shuffleTask: false,
      elementName: "TestName",
    };

    systemUnderTest["setContentData"](adaptivityElementProgressTO);

    expect(viewModel.contentData.Value).toStrictEqual({
      elementName: "TestName",
      introText: "",
      tasks: [
        {
          taskID: 1,
          taskTitle: "TestTaskTitle",
          isCompleted: false,
          requiredDifficulty: 1,
          questions: [
            {
              questionID: 1,
              questionText: "TestQuestionText",
              isRequired: true,
              isCompleted: false,
              difficulty: 1,
              questionAnswers: [
                {
                  answerIndex: 1,
                  answerText: "TestAnswerText",
                  isSelected: false,
                },
              ],
            },
          ],
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
