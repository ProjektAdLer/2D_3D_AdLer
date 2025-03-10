import { AdaptivityElementTriggerConditionTypes } from "./../../../../Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";
import { AdaptivityElementTriggerTypes } from "./../../../../Core/Domain/Types/Adaptivity/AdaptivityElementTriggerTypes";
import {
  AdaptivityHint,
  AdaptivityTask,
} from "./../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import AdaptivityElementProgressTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementQuestionTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import AdaptivityElementPresenter from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
} from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";
import { AdaptivityElementStatusTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import AdaptivityElementHintTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";
import { AdaptivityElementActionTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import AdaptivityElementTriggerTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTriggerTO";
import AdaptivityElementProgressUpdateTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";

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
    },
  );

  test.each([
    [true, AdaptivityElementStatusTypes.Correct],
    [false, AdaptivityElementStatusTypes.Incorrect],
    [null, AdaptivityElementStatusTypes.NotAttempted],
  ])(
    "onAdaptivityElementAnswerEvaluated sets isCompleted of task to %s if the task status is %s",
    (testIsCompleted, testTaskStatus) => {
      const adaptivityElementProgressUpdateTO = {
        elementInfo: {
          elementId: 0,
          success: false,
        },
        taskInfo: {
          taskId: 0,
          taskStatus: testTaskStatus,
        },
        questionInfo: {
          questionId: 1,
          questionStatus: AdaptivityElementStatusTypes.Correct,
        },
      } as AdaptivityElementProgressUpdateTO;
      const question = {
        questionID: 1,
        questionText: "",
        questionAnswers: [],
        isRequired: false,
        isCompleted: false,
        difficulty: undefined,
        isMultipleChoice: false,
        hints: [],
      };
      const task = {
        taskID: 0,
        taskTitle: "TestTask",
        questions: [question],
        isCompleted: false,
        isRequired: false,
        hasBeenCompleted: false,
        requiredDifficulty: undefined,
      };
      const contentData = {
        elementName: "TestElement",
        introText: "",
        tasks: [task],
      };
      viewModel.contentData.Value = contentData;

      systemUnderTest.onAdaptivityElementAnswerEvaluated(
        adaptivityElementProgressUpdateTO,
      );
      expect(
        systemUnderTest["viewModel"].contentData.Value.tasks[0].isCompleted,
      ).toBe(testIsCompleted);
    },
  );

  test.each([
    [true, AdaptivityElementStatusTypes.Correct],
    [false, AdaptivityElementStatusTypes.Incorrect],
    [null, AdaptivityElementStatusTypes.NotAttempted],
  ])(
    "onAdaptivityElementAnswerEvaluated sets isCompleted of question to %s if the question status is %s",
    (testIsCompleted, testQuestionStatus) => {
      const adaptivityElementProgressUpdateTO = {
        isCompleted: undefined,
        hasbeenCompleted: undefined,
        taskInfo: {
          taskId: 0,
          taskStatus: AdaptivityElementStatusTypes.Correct,
        },
        elementInfo: {
          elementId: 0,
          success: false,
        },
        questionInfo: {
          questionId: 1,
          questionStatus: testQuestionStatus,
        },
      };
      const question = {
        questionID: 1,
        questionText: "",
        questionAnswers: [],
        isRequired: false,
        isCompleted: false,
        difficulty: undefined,
        isMultipleChoice: false,
        hints: [],
      };
      const task = {
        taskID: 0,
        taskTitle: "TestTask",
        questions: [question],
        isCompleted: false,
        isRequired: false,
        hasBeenCompleted: false,
        requiredDifficulty: undefined,
      };
      const contentData = {
        elementName: "TestElement",
        introText: "",
        tasks: [task],
      };
      viewModel.contentData.Value = contentData;

      systemUnderTest.onAdaptivityElementAnswerEvaluated(
        adaptivityElementProgressUpdateTO,
      );
      expect(
        systemUnderTest["viewModel"].contentData.Value.tasks[0].questions[0]
          .isCompleted,
      ).toBe(testIsCompleted);
    },
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

  test("onAdaptivityElementUserHintInformed sets selectedHint in viewmodel", () => {
    const adaptivityElementHintTO: AdaptivityElementHintTO = {
      hintID: 0,
      showOnIsWrong: true,
      hintAction: {
        hintActionType: AdaptivityElementActionTypes.CommentAction,
        idData: 42,
        textData: "test",
      },
    };
    systemUnderTest.onAdaptivityElementUserHintInformed!(
      adaptivityElementHintTO,
    );
    expect(viewModel.selectedHint.Value).toEqual(adaptivityElementHintTO);
  });

  test("onAdaptivityElementQuestionAnsweredCorrectly sets isCorrect correctly", () => {
    const answer = {
      answerIndex: 0,
      answerText: "testanswer",
      isSelected: true,
      isCorrect: false,
    };
    const question = {
      questionID: 1,
      questionText: "",
      questionAnswers: [answer],
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

    systemUnderTest.onAdaptivityElementQuestionAnsweredCorrectly!({
      taskInfo: {
        taskId: 1,
      },
      questionInfo: {
        questionId: 1,
        answers: [
          {
            checked: true,
            correct: true,
          },
        ],
      },
    });
    expect(
      viewModel.contentData.Value.tasks[0].questions[0].questionAnswers[0]
        .isCorrect,
    ).toBe(true);
  });

  test("mapAdaptivityTriggers returns empty if no triggers exist", () => {
    const testTriggers = [];
    const result = systemUnderTest["mapAdaptivityTriggers"]([]);
    expect(result).toStrictEqual([]);
  });

  test("mapAdaptivityTriggers returns mapped adaptivityhint if triggers exist", () => {
    const testTriggers: AdaptivityElementTriggerTO[] = [
      {
        triggerId: 42,
        triggerType: AdaptivityElementTriggerTypes.correctness,
        triggerCondition: AdaptivityElementTriggerConditionTypes.correct,
        triggerAction: {
          actionType: AdaptivityElementActionTypes.CommentAction,
          idData: 0,
          textData: "test",
        },
      },
    ];
    const result = systemUnderTest["mapAdaptivityTriggers"](testTriggers);
    const expectedResult: AdaptivityHint[] = [
      {
        hintID: 42,
        showOnIsWrong: false,
        hintAction: {
          hintActionType: AdaptivityElementActionTypes.CommentAction,
          idData: 0,
          textData: "test",
        },
      },
    ];
    expect(result).toStrictEqual(expectedResult);
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
                  isCorrect: undefined,
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
                  isCorrect: undefined,
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
                  isCorrect: undefined,
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
