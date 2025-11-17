import { mock } from "jest-mock-extended";
import { config } from "../../../../config";
import FileBasedBackendAdapter from "../../../Core/Adapters/BackendAdapter/FileBasedBackendAdapter";
import { XAPIEvent } from "../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import AdaptivityElementQuestionSubmissionTO from "../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import { BackendAvatarConfigTO } from "../../../Core/Application/DataTransferObjects/BackendAvatarConfigTO";

// Mock fetch globally
global.fetch = jest.fn();

const mockWorldsJson = {
  worlds: [
    {
      worldID: 1,
      worldName: "Test World",
      worldFolder: "TestWorld",
      description: "Test learning world",
      elementCount: 1,
    },
  ],
};

const mockWorldData = {
  $type: "AWT",
  fileVersion: "2.4.0",
  world: {
    worldName: "Test World",
    worldDescription: "Test learning world",
    worldGoals: [],
    topics: [],
    theme: "CampusAB",
    spaces: [
      {
        $type: "LearningSpace",
        spaceId: 1,
        spaceName: "Test Space",
        spaceDescription: "",
        spaceGoals: [],
        spaceSlotContents: [1, null, null, null, null, null],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "default",
        spaceStory: {
          $type: "SimpleSpaceStory",
          introStory: null,
          outroStory: null,
        },
      },
    ],
    elements: [
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "Test Image",
        elementDescription: "",
        elementGoals: [],
        elementCategory: "image",
        elementFileType: "jpg",
        elementMaxScore: 1,
        elementModel: "l-random",
        learningSpaceParentId: 1,
        url: "",
      },
      {
        $type: "LearningElement",
        elementId: 2,
        elementName: "Test Video",
        elementDescription: "",
        elementGoals: [],
        elementCategory: "video",
        elementFileType: "mp4",
        elementMaxScore: 1,
        elementModel: "l-random",
        learningSpaceParentId: 1,
        url: "https://www.youtube.com/watch?v=test",
      },
      {
        $type: "LearningElement",
        elementId: 3,
        elementName: "Test H5P",
        elementDescription: "",
        elementGoals: [],
        elementCategory: "h5p",
        elementFileType: "h5p",
        elementMaxScore: 1,
        elementModel: "l-random",
        learningSpaceParentId: 1,
        url: "",
      },
    ],
  },
};

describe("FileBasedBackendAdapter", () => {
  let systemUnderTest: FileBasedBackendAdapter;
  const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    systemUnderTest = new FileBasedBackendAdapter();
    fetchMock.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getCoursesAvailableForUser", () => {
    test("should load worlds.json and return courses", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldsJson,
      } as Response);

      const result = await systemUnderTest.getCoursesAvailableForUser("token");

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/LearningWorlds/worlds.json"),
      );
      expect(result.courses).toHaveLength(1);
      expect(result.courses[0]).toEqual({
        courseID: 1,
        courseName: "Test World",
      });
    });

    test("should handle fetch error gracefully", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      const result = await systemUnderTest.getCoursesAvailableForUser("token");

      expect(result.courses).toHaveLength(0);
    });

    test("should cache worlds.json after first load", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldsJson,
      } as Response);

      await systemUnderTest.getCoursesAvailableForUser("token");
      await systemUnderTest.getCoursesAvailableForUser("token");

      // Should only fetch once (cached)
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getWorldData", () => {
    beforeEach(() => {
      // Mock worlds.json load
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldsJson,
      } as Response);
    });

    test("should load world.json and parse AWT", async () => {
      // Mock world.json load
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldData,
      } as Response);

      const result = await systemUnderTest.getWorldData({
        userToken: "token",
        worldID: 1,
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/LearningWorlds/TestWorld/world.json"),
      );
      expect(result.worldName).toBe("Test World");
      expect(result.description).toBe("Test learning world");
      expect(result.spaces).toBeDefined();
      expect(result.spaces!.length).toBeGreaterThan(0);
    });

    test("should throw error if world not found in worlds.json", async () => {
      await expect(
        systemUnderTest.getWorldData({
          userToken: "token",
          worldID: 999,
        }),
      ).rejects.toThrow("World with ID 999 not found in worlds.json");
    });

    test("should cache world data", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldData,
      } as Response);

      await systemUnderTest.getWorldData({ userToken: "token", worldID: 1 });
      await systemUnderTest.getWorldData({ userToken: "token", worldID: 1 });

      // worlds.json (1) + world.json (1) = 2 calls total (not 3)
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test("should handle fetch error for world.json", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(
        systemUnderTest.getWorldData({
          userToken: "token",
          worldID: 1,
        }),
      ).rejects.toThrow();
    });
  });

  describe("getElementSource", () => {
    beforeEach(() => {
      // Mock worlds.json load
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldsJson,
      } as Response);
      // Mock world.json load
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldData,
      } as Response);
    });

    test("should return path to regular file element", async () => {
      const result = await systemUnderTest.getElementSource({
        userToken: "token",
        worldID: 1,
        elementID: 1,
      });

      expect(result).toContain("/LearningWorlds/TestWorld/elements/1.jpg");
    });

    test("should return external URL for elements with URL", async () => {
      const result = await systemUnderTest.getElementSource({
        userToken: "token",
        worldID: 1,
        elementID: 2,
      });

      expect(result).toBe("https://www.youtube.com/watch?v=test");
    });

    test("should return path to H5P folder", async () => {
      const result = await systemUnderTest.getElementSource({
        userToken: "token",
        worldID: 1,
        elementID: 3,
      });

      expect(result).toContain("/LearningWorlds/TestWorld/elements/3");
      expect(result).not.toContain(".h5p");
    });

    test("should throw error for non-existent element", async () => {
      await expect(
        systemUnderTest.getElementSource({
          userToken: "token",
          worldID: 1,
          elementID: 999,
        }),
      ).rejects.toThrow("Element 999 not found in world 1");
    });
  });

  describe("getWorldStatus", () => {
    beforeEach(() => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldsJson,
      } as Response);
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldData,
      } as Response);
    });

    test("should return status with all elements as not scored", async () => {
      const result = await systemUnderTest.getWorldStatus("token", 1);

      expect(result.worldID).toBe(1);
      expect(result.elements).toHaveLength(3);
      expect(result.elements).toEqual([
        { elementID: 1, hasScored: false },
        { elementID: 2, hasScored: false },
        { elementID: 3, hasScored: false },
      ]);
    });
  });

  describe("getElementScore", () => {
    test("should return element as not scored", async () => {
      const result = await systemUnderTest.getElementScore({
        userToken: "token",
        elementID: 1,
        worldID: 1,
      });

      expect(result.elementID).toBe(1);
      expect(result.success).toBe(false);
    });
  });

  describe("scoreElement", () => {
    test("should resolve successfully", async () => {
      const result = await systemUnderTest.scoreElement("token", 1, 1);

      expect(result).toBe(true);
    });
  });

  describe("scoreH5PElement", () => {
    test("should return true for successful H5P completion", async () => {
      const h5pMock = mock<XAPIEvent>();
      h5pMock.verb = {
        id: "http://adlnet.gov/expapi/verbs/completed",
        display: { "en-US": "completed" },
      };
      h5pMock.result = { success: true };

      const result = await systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      });

      expect(result).toBe(true);
    });

    test("should return true for high score (>= 0.6)", async () => {
      const h5pMock = mock<XAPIEvent>();
      h5pMock.verb = {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: { "en-US": "answered" },
      };
      h5pMock.result = { score: { scaled: 0.8 } };

      const result = await systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      });

      expect(result).toBe(true);
    });

    test("should return false for low score (< 0.6)", async () => {
      const h5pMock = mock<XAPIEvent>();
      h5pMock.verb = {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: { "en-US": "answered" },
      };
      h5pMock.result = { score: { scaled: 0.3 } };

      const result = await systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      });

      expect(result).toBe(false);
    });

    test("should return false for unsuccessful result", async () => {
      const h5pMock = mock<XAPIEvent>();
      h5pMock.verb = {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: { "en-US": "answered" },
      };
      h5pMock.result = { success: false };

      const result = await systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      });

      expect(result).toBe(false);
    });

    test("should return false for unknown verb type", async () => {
      const h5pMock = mock<XAPIEvent>();
      h5pMock.verb = {
        id: "http://adlnet.gov/expapi/verbs/unknown",
        display: { "en-US": "unknown" },
      };

      const result = await systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      });

      expect(result).toBe(false);
    });
  });

  describe("loginUser", () => {
    test("should return dummy token", async () => {
      const result = await systemUnderTest.loginUser({
        username: "test",
        password: "test",
      });

      expect(result).toBe("file-based-dummy-token");
    });
  });

  describe("getAdaptivityElementQuestionResponse", () => {
    test("should return default correct response", async () => {
      const submissionData: AdaptivityElementQuestionSubmissionTO = {
        elementID: 1,
        taskID: 1,
        questionID: 1,
        selectedAnswers: [true, false, false],
      };

      const result = await systemUnderTest.getAdaptivityElementQuestionResponse(
        "token",
        1,
        submissionData,
      );

      expect(result.elementScore.elementId).toBe(1);
      expect(result.elementScore.success).toBe(true);
      expect(result.gradedTask.taskId).toBe(1);
      expect(result.gradedTask.taskStatus).toBe("Correct");
      expect(result.gradedQuestion.id).toBe(1);
      expect(result.gradedQuestion.status).toBe("Correct");
      expect(result.gradedQuestion.answers).toBeUndefined();
    });
  });

  describe("getAdaptivityElementStatusResponse", () => {
    test("should return default status", async () => {
      const result = await systemUnderTest.getAdaptivityElementStatusResponse({
        userToken: "token",
        elementID: 1,
        worldID: 1,
      });

      expect(result.element.elementID).toBe(1);
      expect(result.element.success).toBe(false);
      expect(result.questions).toEqual([]);
      expect(result.tasks).toEqual([]);
    });
  });

  describe("getAvatarConfig", () => {
    test("should return default avatar configuration", async () => {
      const result = await systemUnderTest.getAvatarConfig("token");

      expect(result).toBeInstanceOf(BackendAvatarConfigTO);
      expect(result.eyes).toBe("Neural_Eyes_1");
      expect(result.nose).toBe("Nose_1");
      expect(result.mouth).toBe("Mouth_1");
      expect(result.eyebrows).toBe("Brows_1");
      expect(result.hair).toBe("hair-short-vanilla");
      expect(result.beard).toBe("none");
      expect(result.hairColor).toBe(8);
      expect(result.skinColor).toBe(24);
      expect(result.roundness).toBe(0.5);
    });
  });

  describe("updateAvatarConfig", () => {
    test("should return true", async () => {
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
        shirt: "shirts-hoodie" as any,
        shirtColor: 1,
        pants: "pants-jeans" as any,
        pantsColor: 2,
        shoes: "shoes-trainers" as any,
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
  });

  describe("PUBLIC_URL handling", () => {
    test("should include PUBLIC_URL in element source paths", async () => {
      const originalPublicUrl = process.env.PUBLIC_URL;
      process.env.PUBLIC_URL = "/test-path";

      // Recreate adapter to pick up new PUBLIC_URL
      const testAdapter = new FileBasedBackendAdapter();

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldsJson,
      } as Response);
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorldData,
      } as Response);

      const result = await testAdapter.getElementSource({
        userToken: "token",
        worldID: 1,
        elementID: 1,
      });

      expect(result).toContain("/test-path/LearningWorlds");

      process.env.PUBLIC_URL = originalPublicUrl;
    });
  });

  describe("Error handling", () => {
    test("should handle network errors gracefully", async () => {
      fetchMock.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        systemUnderTest.getCoursesAvailableForUser("token"),
      ).resolves.toEqual({ courses: [] });
    });

    test("should handle malformed JSON", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      } as Response);

      await expect(
        systemUnderTest.getCoursesAvailableForUser("token"),
      ).rejects.toThrow();
    });
  });
});
