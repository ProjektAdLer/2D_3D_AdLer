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

  test.each([
    AdaptivityElementQuestionDifficultyTypes.easy,
    AdaptivityElementQuestionDifficultyTypes.medium,
    AdaptivityElementQuestionDifficultyTypes.hard,
  ])(
    "createFooterBreadcrumbs returns the correct string of names with a current question difficulty of %s",
    (testDifficulty) => {
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
                difficulty: testDifficulty,
                isMultipleChoice: false,
                hints: [],
              },
            ],
            isCompleted: false,
            isRequired: false,
            requiredDifficulty: testDifficulty,
          },
        ],
      };
      systemUnderTest["viewModel"].contentData.Value = contentData;
      systemUnderTest["viewModel"].currentTaskID.Value = 1;
      systemUnderTest["viewModel"].currentQuestionID.Value = 1;

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
              questionAnswers: [
                {
                  answerIndex: 0,
                  answerText: "",
                  isSelected: true,
                },
                {
                  answerIndex: 1,
                  answerText: "",
                  isSelected: true,
                },
                {
                  answerIndex: 2,
                  answerText: "",
                  isSelected: false,
                },
              ],
              isRequired: false,
              isCompleted: false,
              difficulty: 0,
              isMultipleChoice: false,
              hints: [],
            },
          ],
          isCompleted: false,
          isRequired: false,
          requiredDifficulty: 0,
        },
      ],
    };
    systemUnderTest["viewModel"].contentData.Value = contentData;
    systemUnderTest["viewModel"].currentTaskID.Value = 1;
    systemUnderTest["viewModel"].currentQuestionID.Value = 1;
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
              difficulty: 0,
              isMultipleChoice: false,
              hints: [],
            },
          ],
          isCompleted: false,
          isRequired: false,
          requiredDifficulty: 0,
        },
      ],
    };
    systemUnderTest["viewModel"].contentData.Value = contentData;
    systemUnderTest["viewModel"].currentTaskID.Value = 1;
    systemUnderTest["viewModel"].currentQuestionID.Value = 1;
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
          requiredDifficulty: 1,
          questions: [
            {
              questionID: 1,
              questionText: "TestQuestionText",
              isRequired: true,
              isCompleted: false,
              isMultipleChoice: false,
              difficulty: 1,
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
