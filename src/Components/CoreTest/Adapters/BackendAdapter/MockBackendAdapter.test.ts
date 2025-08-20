import { MockAdaptivityElementStatusResponse } from "./../../../Core/Adapters/BackendAdapter/MockBackendData/MockAdaptivityData";
import { AdaptivityElementDataTO } from "./../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import { mock } from "jest-mock-extended";
import { config } from "../../../../config";
import MockBackendAdapter from "../../../Core/Adapters/BackendAdapter/MockBackendAdapter";
import LearningWorldStatusTO from "../../../Core/Application/DataTransferObjects/LearningWorldStatusTO";
import { XAPIEvent } from "../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import {
  expectedLearningElementTO,
  expectedSpaceTO,
  expectedWorldTO,
} from "./BackendResponses";
import {
  BackendAdaptivityElementTO,
  BackendLearningElementTO,
} from "../../../Core/Application/DataTransferObjects/BackendElementTO";
import AdaptivityElementQuestionSubmissionTO from "../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementQuestionResponse from "../../../Core/Adapters/BackendAdapter/Types/AdaptivityElementQuestionResponse";

const oldConfigValue = config.useFakeBackend;

let mockGetQuestionResponseFromSubmission = (
  submission: AdaptivityElementQuestionSubmissionTO,
): AdaptivityElementQuestionResponse => {
  return {
    elementScore: {
      elementId: submission.elementID,
      success: false,
    },
    gradedTask: {
      taskId: submission.taskID,
      taskStatus: "Incorrect",
    },
    gradedQuestion: {
      id: submission.questionID,
      status: "Incorrect",
      answers: undefined,
    },
  };
};

describe("MockBackendAdapter", () => {
  let systemUnderTest: MockBackendAdapter;

  beforeAll(() => {
    config.useFakeBackend = true;
  });

  beforeEach(() => {
    systemUnderTest = new MockBackendAdapter();
  });

  afterAll(() => {
    config.useFakeBackend = oldConfigValue;
  });

  test("getWorldData returns BackendWorldTO with correct structure", async () => {
    const result = await systemUnderTest.getWorldData({
      userToken: "",
      worldID: 1,
    });

    // check that the result matches the expected structure of LearningWorldTO
    expect(result).toEqual(expect.objectContaining(expectedWorldTO));
    result.spaces?.forEach((space) => {
      expect(space).toEqual(expectedSpaceTO);

      space.elements?.forEach((element) => {
        if (element instanceof BackendAdaptivityElementTO) {
          expect(element.adaptivity).toEqual(
            expect.any(AdaptivityElementDataTO),
          );
        } else if (element instanceof BackendLearningElementTO) {
          expect(element).toEqual(expectedLearningElementTO);
        } else {
          expect(element).toEqual(null);
        }
      });
    });
  });

  test.todo(
    "add tests for specific desired element types and structure in BackendWorldTO",
  );
  // expect(result.spaces).toHaveLength(4);
  // expect(result.spaces![0].elements).toEqual(
  //   expect.arrayContaining(
  //     Object.keys(ElementTypes).map((elementType) =>
  //       expect.objectContaining({
  //         type: elementType,
  //       })
  //     )
  //   )
  // );

  test("scoreElement resolves", async () => {
    await expect(
      systemUnderTest.scoreElement("token", 42, 1),
    ).resolves.toBeTruthy();
  });

  test("logInUser resolves with a fakeToken", async () => {
    await expect(
      systemUnderTest.loginUser({
        username: "test",
        password: "test",
      }),
    ).resolves.toEqual("fakeToken");
  });

  test("should get Courses Available For User", async () => {
    await expect(
      systemUnderTest.getCoursesAvailableForUser("token"),
    ).resolves.toEqual({
      courses: [
        {
          courseID: 1,
          courseName: "Small World",
        },
        {
          courseID: 2,
          courseName: "Big World",
        },
        {
          courseID: 3,
          courseName: "Subtheme World",
        },
        {
          courseID: 4,
          courseName: "New World",
        },
        {
          courseID: 5,
          courseName: "Requirements-Grading",
        },
        {
          courseID: 999,
          courseName: "AdLer Demo (Development)",
        },
      ],
    });
  });

  test("should score H5P Element", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/answered",
      display: { "en-US": "answered" },
    };
    h5pMock.result = {
      success: true,
    };

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(true);
  });

  test.each([[1], [2], [3], [6]])(
    "should get Element Source",
    async (elementID) => {
      await expect(
        systemUnderTest.getElementSource({
          userToken: "token",
          worldID: 1,
          elementID: elementID,
        }),
      ).resolves.toEqual(expect.any(String));
    },
  );

  test("should get World Status", async () => {
    await expect(systemUnderTest.getWorldStatus("token", 1)).resolves.toEqual({
      worldID: 1,
      elements: [
        {
          elementID: 1,
          hasScored: false,
        },
        {
          elementID: 2,
          hasScored: false,
        },
        {
          elementID: 3,
          hasScored: false,
        },
        {
          elementID: 4,
          hasScored: false,
        },
        {
          elementID: 5,
          hasScored: false,
        },
        {
          elementID: 6,
          hasScored: false,
        },
      ],
    } as LearningWorldStatusTO);
  });

  test("should get Element Score", async () => {
    await expect(
      systemUnderTest.getElementScore({
        userToken: "token",
        elementID: 1,
        worldID: 1,
      }),
    ).resolves.toEqual({
      elementID: 1,
      success: true,
    });
  });

  test("should get adaptivity question response for single-choice questions", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 1,
      questionID: 0,
      selectedAnswers: [false, true, false, false],
    };

    // first single-choice question (in first task)
    let response_1 =
      mockGetQuestionResponseFromSubmission(questionSubmissionTO);
    response_1.gradedQuestion.status = "Correct";
    response_1.gradedTask.taskStatus = "Correct";
    response_1.gradedQuestion.answers = [
      {
        checked: false,
        correct: false,
      },
      {
        checked: true,
        correct: true,
      },
      {
        checked: false,
        correct: false,
      },
      {
        checked: false,
        correct: false,
      },
    ];
    await expect(
      systemUnderTest.getAdaptivityElementQuestionResponse(
        "",
        0,
        questionSubmissionTO,
      ),
    ).resolves.toStrictEqual(response_1);

    // second single-choice question (in second task)
    questionSubmissionTO.taskID = 2;
    questionSubmissionTO.questionID = 3;
    questionSubmissionTO.selectedAnswers = [true, false, false, false];
    let response_2 =
      mockGetQuestionResponseFromSubmission(questionSubmissionTO);
    response_2.gradedQuestion.status = "Correct";
    response_2.gradedTask.taskStatus = "Incorrect";
    response_2.gradedQuestion.answers = [
      {
        checked: true,
        correct: true,
      },
      {
        checked: false,
        correct: false,
      },
      {
        checked: false,
        correct: false,
      },
      {
        checked: false,
        correct: false,
      },
    ];
    await expect(
      systemUnderTest.getAdaptivityElementQuestionResponse(
        "",
        0,
        questionSubmissionTO,
      ),
    ).resolves.toStrictEqual(response_2);
  });

  test("should get adaptivity question response for multiple-choice questions", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 2,
      questionID: 5,
      selectedAnswers: [true, true, false, false],
    };

    let response = mockGetQuestionResponseFromSubmission(questionSubmissionTO);
    response.gradedQuestion.status = "Correct";
    response.gradedTask.taskStatus = "Incorrect";
    response.gradedQuestion.answers = [
      {
        checked: true,
        correct: true,
      },
      {
        checked: true,
        correct: true,
      },
      {
        checked: false,
        correct: false,
      },
      {
        checked: false,
        correct: false,
      },
    ];
    await expect(
      systemUnderTest.getAdaptivityElementQuestionResponse(
        "",
        0,
        questionSubmissionTO,
      ),
    ).resolves.toStrictEqual(response);
  });

  test("should get adaptivity element status", async () => {
    await expect(
      systemUnderTest.getAdaptivityElementStatusResponse({
        userToken: "",
        elementID: 1,
        worldID: 1,
      }),
    ).resolves.toStrictEqual(MockAdaptivityElementStatusResponse);
  });

  test("should complete adaptivity element if all every required task is answered correct", async () => {
    let singleChoice: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 1,
      questionID: 0,
      selectedAnswers: [false, true, false, false],
    };
    systemUnderTest.getAdaptivityElementQuestionResponse("", 0, singleChoice);

    let multiChoice: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 2,
      questionID: 1,
      selectedAnswers: [true, true, false],
    };
    systemUnderTest.getAdaptivityElementQuestionResponse("", 0, multiChoice);

    const result = await systemUnderTest.getAdaptivityElementStatusResponse({
      userToken: "",
      worldID: 1,
      elementID: 1,
    });
    expect(result.element).toStrictEqual({
      elementID: -1,
      success: true,
    });
  });
});
