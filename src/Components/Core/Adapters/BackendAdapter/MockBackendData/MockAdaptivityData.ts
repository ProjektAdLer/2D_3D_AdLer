import { APIAdaptivity } from "../Types/AWT";
import AdaptivityElementStatusResponse from "../Types/AdaptivityElementStatusResponse";

/* istanbul ignore next */
export const MockAdaptivityData: APIAdaptivity = {
  introText: "Hier wird das Adaptivitätselement erklärt",
  adaptivityTasks: [
    {
      taskId: 1,
      taskTitle: "Aufgabe 1 - Geografie",
      optional: false,
      requiredDifficulty: 100,
      adaptivityQuestions: [
        {
          questionType: "singleResponse",
          questionId: 0,
          questionDifficulty: 100,
          questionText: "Welches Land grenzt nicht an Deutschland?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "AdaptivityReferenceAction",
                elementId: 1,
                hintText: "Schau dir die Karte nochmal an.",
              },
            },
          ],
          choices: [
            {
              answerText: "Dänemark",
            },
            {
              answerText: "Norwegen",
            },
            {
              answerText: "Polen",
            },
            {
              answerText: "Tschechien",
            },
          ],
        },
      ],
    },
    {
      taskId: 2,
      taskTitle: "Debug Aufgabe",
      optional: false,
      requiredDifficulty: 100,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 1,
          questionDifficulty: 100,
          questionText:
            "Multiple Choice Frage: Wähle alle richtigen Antworten aus",
          adaptivityRules: [
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "richtig",
            },
            {
              answerText: "richtig",
            },
            {
              answerText: "falsch",
            },
          ],
        },
        {
          questionType: "singleResponse",
          questionId: 2,
          questionDifficulty: 200,
          questionText: "Single Choice: Wähle die richtige Antwort",
          adaptivityRules: [
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "AdaptivityContentReferenceAction",
                elementId: 999,
                hintText: "Das war falsch. Hier hast du etwas Hilfe.",
              },
            },
          ],
          choices: [
            {
              answerText: "falsch",
            },
            {
              answerText: "richtig",
            },
            {
              answerText: "falsch",
            },
          ],
        },
        {
          questionType: "singleResponse",
          questionId: 3,
          questionDifficulty: 0,
          questionText: "Single Choice: Wähle die richtige Antwort",
          adaptivityRules: [
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "AdaptivityReferenceAction",
                elementId: 2,
                hintText: null,
              },
            },
          ],
          choices: [
            {
              answerText: "richtig",
            },
            {
              answerText: "falsch",
            },
            {
              answerText: "falsch",
            },
          ],
        },
      ],
    },
    {
      taskId: 3,
      taskTitle:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, hier könnte Ihre Werbung stehen",
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 4,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 4,
      taskTitle: "Aufgabe 4, nicht mehr ",
      optional: true,
      requiredDifficulty: 0,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 5,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 5,
      taskTitle:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
      optional: true,
      requiredDifficulty: 0,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 6,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 6,
      taskTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
      optional: true,
      requiredDifficulty: 0,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 7,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 7,
      taskTitle: "Ja Moin, wer es bis hier schafft, ist ein Champion",
      optional: true,
      requiredDifficulty: 0,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 8,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 8,
      taskTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
      optional: true,
      requiredDifficulty: 0,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 9,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 9,
      taskTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
      optional: true,
      requiredDifficulty: 3,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 10,
          questionDifficulty: 0,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
    {
      taskId: 10,
      taskTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
      optional: true,
      requiredDifficulty: 0,
      adaptivityQuestions: [
        {
          questionType: "multipleResponse",
          questionId: 11,
          questionDifficulty: 3,
          questionText: "Welche Zahlen sind Primzahlen?",
          adaptivityRules: [
            {
              triggerId: 1,
              triggerCondition: "correct",
              adaptivityAction: {
                $type: "CommentAction",
                commentText: "Das war richtig. Gut gemacht!",
              },
            },
            {
              triggerId: 2,
              triggerCondition: "incorrect",
              adaptivityAction: {
                $type: "CommentAction",
                commentText:
                  "Das war leider falsch, eine Primzahl ist nur durch sich selbst, oder durch 1 teilbar.",
              },
            },
          ],
          choices: [
            {
              answerText: "2",
            },
            {
              answerText: "3",
            },
            {
              answerText: "14",
            },
          ],
        },
      ],
    },
  ],
};

/* istanbul ignore next */
export const MockAdaptivityElementStatusResponse: AdaptivityElementStatusResponse =
  {
    element: {
      elementID: -1,
      success: false,
    },
    tasks: MockAdaptivityData.adaptivityTasks.map((task) => ({
      taskId: task.taskId,
      taskStatus: "NotAttempted",
    })),
    questions: MockAdaptivityData.adaptivityTasks.flatMap((task) => {
      return task.adaptivityQuestions.map((question) => ({
        id: question.questionId,
        status: "NotAttempted",
        answers: null!,
      }));
    }),
  };
