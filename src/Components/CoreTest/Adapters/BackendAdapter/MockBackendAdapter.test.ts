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
import { BackendAvatarConfigTO } from "../../../Core/Application/DataTransferObjects/BackendAvatarConfigTO";

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

  test("getWorldData should handle different worldIDs", async () => {
    const resultWorld2 = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 2,
    });
    const resultWorld3 = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 3,
    });

    expect(resultWorld2).toBeDefined();
    expect(resultWorld3).toBeDefined();
  });

  test("getWorldData should handle showcase mode", async () => {
    const originalEnv = process.env.REACT_APP_IS_SHOWCASE;
    process.env.REACT_APP_IS_SHOWCASE = "true";

    const result = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 1,
    });

    expect(result).toBeDefined();
    process.env.REACT_APP_IS_SHOWCASE = originalEnv;
  });

  test("getCoursesAvailableForUser should return showcase course in showcase mode", async () => {
    const originalEnv = process.env.REACT_APP_IS_SHOWCASE;
    process.env.REACT_APP_IS_SHOWCASE = "true";

    const result = await systemUnderTest.getCoursesAvailableForUser("token");

    expect(result.courses).toHaveLength(1);
    expect(result.courses[0].courseID).toBe(999);

    process.env.REACT_APP_IS_SHOWCASE = originalEnv;
  });

  test("scoreH5PElement should handle completed verb", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/completed",
      display: { "en-US": "completed" },
    };
    h5pMock.result = { success: true };

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(true);
  });

  test("scoreH5PElement should handle score-based evaluation", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/answered",
      display: { "en-US": "answered" },
    };
    h5pMock.result = { score: { scaled: 0.8 } };

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(true);
  });

  test("scoreH5PElement should handle unsuccessful results", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/answered",
      display: { "en-US": "answered" },
    };
    h5pMock.result = { success: false };

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(false);
  });

  test("getElementSource should handle special H5P element ID 5", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 5,
    });

    expect(result).toContain("MultipleChoiceDemo");
  });

  test("getElementSource should consider PUBLIC_URL", async () => {
    const originalPublicUrl = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = "/test-path";

    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 5,
    });

    expect(result).toContain("/test-path");
    process.env.PUBLIC_URL = originalPublicUrl;
  });

  test("getAvatarConfig should return default configuration", async () => {
    const result = await systemUnderTest.getAvatarConfig("token");

    expect(result).toEqual({
      eyes: "Neural_Eyes_1",
      nose: "Nose_1",
      mouth: "Mouth_1",
      eyebrows: "Brows_1",
      hair: "hair-medium-ponytail",
      beard: "beard-medium-anchor",
      hairColor: 8,
      headgear: "none",
      glasses: "glasses-browline",
      backpack: "none",
      other: "none",
      shirt: "shirts-sweatshirt",
      pants: "pants-jeans",
      shoes: "shoes-trainers",
      skinColor: 24,
      roundness: 0.5,
    });
  });

  test("updateAvatarConfig should return true", async () => {
    const avatarConfig: BackendAvatarConfigTO = {
      eyes: "Neural_Eyes_2",
      nose: "Nose_2",
      mouth: "Mouth_2",
      eyebrows: "Brows_2",
      hair: "hair-short-curly" as any,
      beard: "none" as any,
      hairColor: 5,
      headgear: "none" as any,
      glasses: "none" as any,
      backpack: "none" as any,
      other: "none" as any,
      shirt: "shirts-polo" as any,
      shirtColor: 1,
      pants: "pants-chinos" as any,
      pantsColor: 2,
      shoes: "shoes-casual" as any,
      shoesColor: 3,
      skinColor: 16,
      roundness: 0.7,
    };

    const result = await systemUnderTest.updateAvatarConfig(
      "token",
      avatarConfig,
    );
    expect(result).toBe(true);
  });

  // Zusätzliche Tests für bessere Coverage
  test("getElementSource should handle video elements", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 2, // Video element
    });
    expect(result).toBe("https://vimeo.com/782061723");
  });

  test("getElementSource should handle pdf elements", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 6, // PDF element
    });
    expect(result).toContain("testPDF.pdf");
  });

  test("getElementSource should handle image elements", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 3, // Image element
    });
    expect(result).toContain("testBild.png");
  });

  test("getElementSource should handle text elements", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 1, // Text element
    });
    expect(result).toContain("fktohneParamohneRueckgabeohneDeklaration.c");
  });

  test("getElementSource should handle unknown worldID", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 888, // Unknown worldID -> should use SimpleWorldAWT
      elementID: 1,
    });
    expect(result).toBeDefined();
  });

  test("getWorldData should handle worldID 4 and 5", async () => {
    const result4 = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 4,
    });
    const result5 = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 5,
    });

    expect(result4).toBeDefined();
    expect(result5).toBeDefined();
  });

  test("getWorldData should handle worldID 999", async () => {
    const result = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 999,
    });

    expect(result).toBeDefined();
  });

  test("scoreH5PElement should handle missing result object", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/answered",
      display: { "en-US": "answered" },
    };
    // No result object

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(false);
  });

  test("scoreH5PElement should handle low score", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/answered",
      display: { "en-US": "answered" },
    };
    h5pMock.result = { score: { scaled: 0.3 } }; // Below 0.6 threshold

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(false);
  });

  test("should get wrong answer for adaptivity question", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 1,
      questionID: 0,
      selectedAnswers: [true, false, false, false], // Wrong answer
    };

    const response = await systemUnderTest.getAdaptivityElementQuestionResponse(
      "",
      0,
      questionSubmissionTO,
    );

    expect(response.gradedQuestion.status).toBe("Incorrect");
  });

  test("should handle multiple selected answers in adaptivity question", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 2,
      questionID: 1,
      selectedAnswers: [true, false, true, false], // Multiple answers, not the correct combination
    };

    const response = await systemUnderTest.getAdaptivityElementQuestionResponse(
      "",
      0,
      questionSubmissionTO,
    );

    expect(response.gradedQuestion.status).toBe("Incorrect");
  });

  test("getElementSource should handle different element types in different worlds", async () => {
    // Test world 2 (StoryWorldAWT)
    const result2 = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 2,
      elementID: 1,
    });
    expect(result2).toBeDefined();

    // Test world 3 (SubthemeWorldAWT)
    const result3 = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 3,
      elementID: 1,
    });
    expect(result3).toBeDefined();
  });

  test("scoreH5PElement should handle unknown verb types", async () => {
    const h5pMock = mock<XAPIEvent>();
    h5pMock.verb = {
      id: "http://adlnet.gov/expapi/verbs/unknown",
      display: { "en-US": "unknown" },
    };
    h5pMock.result = { success: true };

    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      }),
    ).resolves.toEqual(false);
  });

  test("adaptivity element should handle question ID 2", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 1,
      questionID: 2,
      selectedAnswers: [false, true, false, false], // Correct answer for ID 2
    };

    const response = await systemUnderTest.getAdaptivityElementQuestionResponse(
      "",
      0,
      questionSubmissionTO,
    );

    expect(response.gradedQuestion.status).toBe("Correct");
  });

  test("getElementSource should handle primitiveH5P category", async () => {
    // Test to trigger the primitiveH5P case in the switch statement
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 1,
      elementID: 5, // This should be h5p or primitiveH5P
    });
    expect(result).toContain("MultipleChoiceDemo");
  });

  test("getElementSource should handle element from world 5", async () => {
    const result = await systemUnderTest.getElementSource({
      userToken: "token",
      worldID: 5, // RequirementsGradingAWT
      elementID: 1,
    });
    expect(result).toBeDefined();
  });

  test("adaptivity question with multiple answers - wrong combination", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 2,
      questionID: 1, // ID between 0 and 12, multi-choice
      selectedAnswers: [false, true, false, false], // Wrong: should be [true, true, false, false]
    };

    const response = await systemUnderTest.getAdaptivityElementQuestionResponse(
      "",
      0,
      questionSubmissionTO,
    );

    expect(response.gradedQuestion.status).toBe("Incorrect");
  });

  test("adaptivity question with ID 0 - multiple selections", async () => {
    let questionSubmissionTO: AdaptivityElementQuestionSubmissionTO = {
      elementID: 1,
      taskID: 1,
      questionID: 0,
      selectedAnswers: [true, true, false, false], // Multiple selections for single-choice
    };

    const response = await systemUnderTest.getAdaptivityElementQuestionResponse(
      "",
      0,
      questionSubmissionTO,
    );

    expect(response.gradedQuestion.status).toBe("Incorrect");
  });

  test("getWorldData should use correct world mappings", async () => {
    // Test the exact worldID mapping logic
    const resultUnknown = await systemUnderTest.getWorldData({
      userToken: "token",
      worldID: 777, // Should default to SubthemeWorldAWT
    });

    expect(resultUnknown).toBeDefined();
  });
});
