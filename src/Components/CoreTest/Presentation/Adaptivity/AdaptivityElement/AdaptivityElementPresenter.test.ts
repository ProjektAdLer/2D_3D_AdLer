import AdaptivityElementProgressTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementQuestionTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import AdaptivityElementPresenter from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import { AdaptivityElementStatusTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";

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
              questionType: AdaptivityElementQuestionTypes.singleResponse,
              triggers: [],
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
      elementName: "",
      id: 1,
    };

    systemUnderTest.onAdaptivityElementLoaded(adaptivityElementProgressTO);

    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
  });

  // ANF-ID: [EWE0020]
  test.each([
    AdaptivityElementQuestionDifficultyTypes.easy,
    AdaptivityElementQuestionDifficultyTypes.medium,
    AdaptivityElementQuestionDifficultyTypes.hard,
  ])(
    "createFooterBreadcrumbs returns the correct string of names with a current question difficulty of %s",
    (testDifficulty) => {
      const question = {
        questionID: 1,
        questionText: "",
        questionAnswers: [],
        isRequired: false,
        isCompleted: false,
        difficulty: testDifficulty,
        isMultipleChoice: false,
        hints: [],
      };
      const task = {
        taskID: 1,
        taskTitle: "TestTask",
        questions: [question],
        isCompleted: false,
        isRequired: false,
        hasBeenCompleted: false,
        requiredDifficulty: testDifficulty,
      };
      const contentData: AdaptivityElementContent = {
        elementName: "TestElement",
        introText: "",
        tasks: [task],
      };
      systemUnderTest["viewModel"].contentData.Value = contentData;
      systemUnderTest["viewModel"].currentTask.Value = task;
      systemUnderTest["viewModel"].currentQuestion.Value = question;

      systemUnderTest["setFooterBreadcrumbs"]();

      expect(viewModel.footerText.Value).toMatchSnapshot();
    }
  );

  // TODO: complete this test
  test.skip.each([
    [
      AdaptivityElementStatusTypes.Correct,
      AdaptivityElementStatusTypes.Correct,
      true,
      true,
    ],
    [
      AdaptivityElementStatusTypes.Correct,
      AdaptivityElementStatusTypes.Incorrect,
      true,
      false,
    ],
    [
      AdaptivityElementStatusTypes.Incorrect,
      AdaptivityElementStatusTypes.Correct,
      false,
      true,
    ],
    [
      AdaptivityElementStatusTypes.Incorrect,
      AdaptivityElementStatusTypes.Incorrect,
      false,
      false,
    ],
  ])(
    `onAdaptivityElementAnswerEvaluated sets isCompleted to %s if the question status is %s`,
    (testIsCompleted, testQuestionStatus) => {}
  );

  test("onAdaptivityElementAnswerEvaluated resets isSelected for all answers of the current question", () => {
    const question = {
      questionID: 1,
      questionText: "",
      questionAnswers: [
        {
          answerIndex: 1,
          answerText: "",
          isSelected: true,
        },
      ],
      isRequired: false,
      isCompleted: false,
      difficulty: 0,
      isMultipleChoice: false,
      hints: [],
    };
    const task = {
      taskID: 1,
      taskTitle: "TestTask",
      questions: [question],
      isCompleted: false,
      isRequired: false,
      hasBeenCompleted: false,
      requiredDifficulty: 0,
    };
    const contentData: AdaptivityElementContent = {
      elementName: "TestElement",
      introText: "",
      tasks: [task],
    };

    systemUnderTest["viewModel"].contentData.Value = contentData;
    systemUnderTest["viewModel"].currentTask.Value = task;
    systemUnderTest["viewModel"].currentQuestion.Value = question;
    systemUnderTest["viewModel"].showFeedback.Value = false;

    systemUnderTest.onAdaptivityElementAnswerEvaluated({
      elementInfo: {
        elementId: 1,
        success: true,
      },
      taskInfo: {
        taskId: 1,
        taskStatus: AdaptivityElementStatusTypes.Correct,
      },
      questionInfo: {
        questionId: 1,
        questionStatus: AdaptivityElementStatusTypes.Correct,
      },
    });

    contentData.tasks[0].questions[0].questionAnswers.forEach((answer) => {
      expect(answer.isSelected).toBe(false);
    });
  });

  test("onAdaptivityElementAnswerEvaluated sets showFeedback to true", () => {
    const question = {
      questionID: 1,
      questionText: "",
      questionAnswers: [],
      isRequired: false,
      isCompleted: false,
      difficulty: 0,
      isMultipleChoice: false,
      hints: [],
    };
    const task = {
      taskID: 1,
      taskTitle: "TestTask",
      questions: [question],
      isCompleted: false,
      isRequired: false,
      hasBeenCompleted: false,
      requiredDifficulty: 0,
    };
    const contentData: AdaptivityElementContent = {
      elementName: "TestElement",
      introText: "",
      tasks: [task],
    };

    systemUnderTest["viewModel"].contentData.Value = contentData;
    systemUnderTest["viewModel"].currentTask.Value = task;
    systemUnderTest["viewModel"].currentQuestion.Value = question;
    systemUnderTest["viewModel"].showFeedback.Value = false;

    systemUnderTest.onAdaptivityElementAnswerEvaluated({
      elementInfo: {
        elementId: 1,
        success: true,
      },
      taskInfo: {
        taskId: 1,
        taskStatus: AdaptivityElementStatusTypes.Correct,
      },
      questionInfo: {
        questionId: 1,
        questionStatus: AdaptivityElementStatusTypes.Correct,
      },
    });

    expect(viewModel.showFeedback.Value).toBe(true);
  });

  // ANF-ID: [EWE0012]
  test("createContentData returns the correct and sorted content data", () => {
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
              questionType: AdaptivityElementQuestionTypes.singleResponse,
              triggers: [],
              questionAnswers: [
                {
                  answerId: 1,
                  answerText: "TestAnswerText",
                },
              ],
              questionDifficulty: 100,
              isCompleted: false,
            },
            {
              questionId: 2,
              questionText: "TestQuestionText",
              questionType: AdaptivityElementQuestionTypes.singleResponse,
              triggers: [],
              questionAnswers: [
                {
                  answerId: 1,
                  answerText: "TestAnswerText",
                },
              ],
              questionDifficulty: 200,
              isCompleted: false,
            },
            {
              questionId: 3,
              questionText: "TestQuestionText",
              questionType: AdaptivityElementQuestionTypes.singleResponse,
              triggers: [],
              questionAnswers: [
                {
                  answerId: 1,
                  answerText: "TestAnswerText",
                },
              ],
              questionDifficulty: 0,
              isCompleted: false,
            },
          ],
          requiredDifficulty: 100,
          isCompleted: false,
        },
      ],
      introText: "",
      elementName: "TestName",
      id: 1,
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
          isRequired: true,
          hasBeenCompleted: false,
          requiredDifficulty: 100,
          questions: [
            {
              questionID: 3,
              questionText: "TestQuestionText",
              isRequired: false,
              isCompleted: false,
              isMultipleChoice: false,
              difficulty: 0,
              questionAnswers: [
                {
                  answerIndex: 1,
                  answerText: "TestAnswerText",
                  isSelected: false,
                },
              ],
              hints: [],
            },
            {
              questionID: 1,
              questionText: "TestQuestionText",
              isRequired: true,
              isCompleted: false,
              isMultipleChoice: false,
              difficulty: 100,
              questionAnswers: [
                {
                  answerIndex: 1,
                  answerText: "TestAnswerText",
                  isSelected: false,
                },
              ],
              hints: [],
            },
            {
              questionID: 2,
              questionText: "TestQuestionText",
              isRequired: false,
              isCompleted: false,
              isMultipleChoice: false,
              difficulty: 200,
              questionAnswers: [
                {
                  answerIndex: 1,
                  answerText: "TestAnswerText",
                  isSelected: false,
                },
              ],
              hints: [],
            },
          ],
        },
      ],
    });
  });
});
