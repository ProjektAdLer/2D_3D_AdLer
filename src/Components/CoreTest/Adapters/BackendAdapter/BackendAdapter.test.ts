import { BackendAvatarConfigTO } from "./../../../Core/Application/DataTransferObjects/BackendAvatarConfigTO";
import { AdaptivityElementDataTO } from "./../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import { mock } from "jest-mock-extended";
import {
  expectedLearningElementTO,
  expectedSpaceTO,
  expectedWorldTO,
  mockAWT,
  mockAWTWithCampusABTheme,
  mockAWTWithCompanyTheme,
  mockAWTWithCampusKETheme,
  mockAWTWithSuburbTheme,
} from "./BackendResponses";
import { config } from "../../../../config";
import BackendAdapter from "../../../Core/Adapters/BackendAdapter/BackendAdapter";
import axios, { AxiosResponse } from "axios";
import { XAPIEvent } from "../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import WorldStatusResponse, {
  CoursesAvailableForUserResponse,
} from "../../../Core/Adapters/BackendAdapter/Types/BackendResponseTypes";
import LearningWorldStatusTO from "../../../Core/Application/DataTransferObjects/LearningWorldStatusTO";
import {
  BackendAdaptivityElementTO,
  BackendLearningElementTO,
} from "../../../Core/Application/DataTransferObjects/BackendElementTO";
import AdaptivityElementQuestionSubmissionTO from "../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import { ElementDataParams } from "../../../Core/Application/Ports/Interfaces/IBackendPort";
import AdaptivityElementstatusResponse from "../../../Core/Adapters/BackendAdapter/Types/AdaptivityElementStatusResponse";
import { ThemeType } from "../../../Core/Domain/Types/ThemeTypes";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const oldConfigBackendValue = config.useFakeBackend;
const oldConfigServerURL = config.serverURL;

const mockedBackendAvatarConfigTO = {
  eyebrows: "eyebrows",
  eyes: "eyes",
  nose: "nose",
  mouth: "mouth",
  hair: "hair-backhead",
  beard: "beard-full-long",
  hairColor: 0,
  headgear: "none",
  glasses: "glasses-oval",
  backpack: "backpack-santapack",
  other: "other-sheriff-star",
  shirt: "shirts-dress",
  shirtColor: 1,
  pants: "pants-cargo",
  pantsColor: 2,
  shoes: "shoes-boots",
  shoesColor: 3,
  skinColor: 4,
  roundness: 1,
} as BackendAvatarConfigTO;

describe("BackendAdapter", () => {
  let systemUnderTest: BackendAdapter;

  beforeAll(() => {
    config.useFakeBackend = false;
  });

  beforeEach(() => {
    config.serverURL = "http://localhost:1337";
    systemUnderTest = new BackendAdapter();
  });

  afterAll(() => {
    config.useFakeBackend = oldConfigBackendValue;
    config.serverURL = oldConfigServerURL;
  });

  test("should throw error if url is invalid", () => {
    config.serverURL = "errorURL";
    config.isDebug = true;
    expect(() => {
      new BackendAdapter();
    }).toThrowError();
    config.isDebug = false;
  });

  test("getWorldData calls backend to get AWT file", async () => {
    const userToken = "testToken";
    const worldID = 1337;

    mockedAxios.get.mockResolvedValue({ data: mockAWT });

    await systemUnderTest.getWorldData({
      userToken: userToken,
      worldID: worldID,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("/Worlds/" + worldID, {
      headers: {
        token: userToken,
      },
    });
  });

  test("getWorldData converts AWT to TOs", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockAWT });

    const result = await systemUnderTest.getWorldData({
      userToken: "",
      worldID: 1337,
    });

    // check that the result matches the expected structure of LearningWorldTO
    expect(result).toEqual(expect.objectContaining(expectedWorldTO));

    // Validate top-level world properties
    expect(result.worldName).toBe(mockAWT.world.worldName);
    expect(result.description).toBe(mockAWT.world.worldDescription);
    expect(result.goals).toEqual(mockAWT.world.worldGoals);
    expect(result.theme).toBeDefined();
    expect(result.externalElements).toEqual(expect.any(Array));

    // Validate optional fields
    if (mockAWT.world.evaluationLink) {
      expect(result.evaluationLink).toBe(mockAWT.world.evaluationLink);
    }
    if (mockAWT.world.evaluationLinkName) {
      expect(result.evaluationLinkName).toBe(mockAWT.world.evaluationLinkName);
    }
    if (mockAWT.world.evaluationLinkText) {
      expect(result.evaluationLinkText).toBe(mockAWT.world.evaluationLinkText);
    }
    if (mockAWT.world.frameStory) {
      expect(result.narrativeFramework).toBe(mockAWT.world.frameStory);
    }
    if (mockAWT.world.worldGradingStyle) {
      expect(result.gradingStyle).toBe(mockAWT.world.worldGradingStyle);
    }

    result.spaces?.forEach((space) => {
      expect(space).toEqual(expectedSpaceTO);

      // Validate space-specific properties
      expect(space.templateStyle).toBeDefined();
      expect(space.template).toBeDefined();

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

    // check that the result has the same amount of learning rooms as the AWT
    expect(result.spaces).toHaveLength(mockAWT.world.spaces.length);

    result.spaces?.forEach((space, index) => {
      // check that the results learning rooms have
      // the same amount of learning elements as in the AWT
      // 4: Are the 4 Basic learning elements in the AWT
      expect(space.elements).toHaveLength(1);
    });
  });

  describe("getWorldData - Theme Validation", () => {
    test("getWorldData correctly assigns CampusAB theme from AWT", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockAWTWithCampusABTheme });

      const result = await systemUnderTest.getWorldData({
        userToken: "",
        worldID: 1337,
      });

      expect(result.theme).toBe(ThemeType.CampusAB);
    });

    test("getWorldData correctly assigns CampusKE theme from AWT", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockAWTWithCampusKETheme });

      const result = await systemUnderTest.getWorldData({
        userToken: "",
        worldID: 1337,
      });

      expect(result.theme).toBe(ThemeType.CampusKE);
    });

    test("getWorldData correctly assigns Company theme from AWT", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockAWTWithCompanyTheme });

      const result = await systemUnderTest.getWorldData({
        userToken: "",
        worldID: 1337,
      });

      expect(result.theme).toBe(ThemeType.Company);
    });

    test("getWorldData correctly assigns Suburb theme from AWT", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockAWTWithSuburbTheme });

      const result = await systemUnderTest.getWorldData({
        userToken: "",
        worldID: 1337,
      });

      expect(result.theme).toBe(ThemeType.Suburb);
    });

    test("getWorldData applies space-specific themes for CampusAB spaces", async () => {
      mockedAxios.get.mockResolvedValue({
        data: mockAWTWithCampusABTheme,
      });

      const result = await systemUnderTest.getWorldData({
        userToken: "",
        worldID: 1337,
      });

      // Verify that the first space (with LEARNINGAREA style) gets the combined theme
      if (result.spaces && result.spaces.length > 0) {
        expect(result.spaces[0].templateStyle).toBe(
          ThemeType.CampusAB_LearningArea,
        );
      }
    });

    test("getWorldData applies world theme when space has no specific style", async () => {
      mockedAxios.get.mockResolvedValue({
        data: mockAWTWithCampusABTheme,
      });

      const result = await systemUnderTest.getWorldData({
        userToken: "",
        worldID: 1337,
      });

      // Verify world theme is set correctly
      expect(result.theme).toBe(ThemeType.CampusAB);
    });
  });

  test("logInUser calls backend and returns a token", async () => {
    const token = "token";
    const userName = "userName";
    const password = "password";

    mockedAxios.post.mockResolvedValue({
      data: {
        lmsToken: token,
      },
    });
    const returnedVal = await systemUnderTest.loginUser({
      username: userName,
      password: password,
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith("/Users/Login", {
      UserName: userName,
      Password: password,
    });
    expect(returnedVal).toBe(token);
  });

  test("should score a Learning Element", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        isSuccess: true,
      },
    });
    const returnedVal = await systemUnderTest.scoreElement("token", 1, 1);

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      "/Elements/World/" + 1 + "/Element/" + 1,
      {},
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toBe(true);
  });

  test("should get all available courses for a user", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        worlds: [{ worldId: 1, worldName: "string" }],
      },
    } as AxiosResponse<CoursesAvailableForUserResponse>);
    const returnedVal =
      await systemUnderTest.getCoursesAvailableForUser("token");

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("/Worlds", {
      headers: {
        token: "token",
      },
    });
    expect(returnedVal).toEqual({
      courses: [{ courseID: 1, courseName: "string" }],
    });
  });

  test("should score a H5P Element", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        isSuccess: true,
      },
    });
    const h5pMock = mock<XAPIEvent>();
    const returnedVal = await systemUnderTest.scoreH5PElement({
      courseID: 1,
      h5pID: 1,
      userToken: "token",
      rawH5PEvent: h5pMock,
    });

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      "/Elements/World/" + 1 + "/Element/" + 1,
      {
        serializedXAPIEvent: JSON.stringify(h5pMock),
      },
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toEqual(true);
  });

  test("should get Element Source", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { filePath: "string" },
    });
    const returnedVal = await systemUnderTest.getElementSource({
      userToken: "token",
      elementID: 1,
      worldID: 1,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/Elements/FilePath/World/" + 1 + "/Element/" + 1,
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toEqual("string");
  });

  test("should get World Status", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        worldId: 1,
        elements: [
          {
            elementId: 1,
            success: true,
          },
        ],
      } as WorldStatusResponse,
    });
    const returnedVal = await systemUnderTest.getWorldStatus("token", 1);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("/Worlds/" + 1 + "/status", {
      headers: {
        token: "token",
      },
    });
    expect(returnedVal).toEqual({
      worldID: 1,
      elements: [
        {
          elementID: 1,
          hasScored: true,
        },
      ],
    } as LearningWorldStatusTO);
  });

  test("should get Element Score", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        elementID: 1,
        success: true,
      },
    });
    const returnedVal = await systemUnderTest.getElementScore({
      userToken: "token",
      elementID: 1,
      worldID: 1,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/Elements/World/" + 1 + "/Element/" + 1 + "/Score",
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toEqual({
      elementID: 1,
      success: true,
    });
  });

  test("should update adaptivity data", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        elementScore: {
          elementId: 1,
          success: true,
        },
        gradedTask: {
          taskId: 1,
          taskStatus: "",
        },
        gradedQuestion: {
          id: 1,
          status: "",
          answers: undefined,
        },
      },
    });
    const returnedVal =
      await systemUnderTest.getAdaptivityElementQuestionResponse("token", 0, {
        elementID: 1,
        taskID: 1,
        questionID: 1,
        selectedAnswers: [false, false, true],
      } as AdaptivityElementQuestionSubmissionTO);

    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      "/Elements/World/" + 0 + "/Element/" + 1 + "/Question/" + 1,
      [false, false, true],
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toEqual({
      elementScore: {
        elementId: 1,
        success: true,
      },
      gradedTask: {
        taskId: 1,
        taskStatus: "",
      },
      gradedQuestion: {
        id: 1,
        status: "",
        answers: undefined,
      },
    });
  });

  test("getAdaptivityElementStatusResponse calls backend and returns a response ", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        element: {
          elementID: 1,
          success: true,
        },
        questions: [
          {
            id: 1,
            status: "",
            answers: [
              {
                checked: true,
                correct: true,
              },
            ],
          },
        ],
        tasks: [
          {
            taskId: 1,
            taskStatus: "",
          },
        ],
      },
    });
    const returnedVal =
      await systemUnderTest.getAdaptivityElementStatusResponse({
        userToken: "token",
        elementID: 1,
        worldID: 0,
      } as ElementDataParams);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/Elements/World/" + 0 + "/Element/" + 1 + "/Adaptivity",
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toEqual({
      element: {
        elementID: 1,
        success: true,
      },
      questions: [
        {
          id: 1,
          status: "",
          answers: [
            {
              checked: true,
              correct: true,
            },
          ],
        },
      ],
      tasks: [
        {
          taskId: 1,
          taskStatus: "",
        },
      ],
    } as AdaptivityElementstatusResponse);
  });

  test("getAvatarConfig calls backend and returns avatarconfig", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        mockedBackendAvatarConfigTO,
      },
    });
    const returnedVal = await systemUnderTest.getAvatarConfig("token");

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith("/Player/Avatar", {
      headers: {
        token: "token",
      },
    });
    expect(returnedVal).toEqual({ mockedBackendAvatarConfigTO });
  });

  test("updateAvatarConfig calls backend and returns avatarconfig", async () => {
    mockedAxios.post.mockResolvedValue({
      data: true,
    });
    const returnedVal = await systemUnderTest.updateAvatarConfig(
      "token",
      mockedBackendAvatarConfigTO,
    );

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/Player/Avatar",
      mockedBackendAvatarConfigTO,
      {
        headers: {
          token: "token",
        },
      },
    );
    expect(returnedVal).toEqual(true);
  });
});
