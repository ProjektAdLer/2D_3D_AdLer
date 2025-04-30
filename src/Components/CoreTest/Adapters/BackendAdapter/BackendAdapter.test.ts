import { BackendAvatarConfigTO } from "./../../../Core/Application/DataTransferObjects/BackendAvatarConfigTO";
import { AdaptivityElementDataTO } from "./../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import { mock } from "jest-mock-extended";
import {
  expectedLearningElementTO,
  expectedSpaceTO,
  expectedWorldTO,
  mockAWT,
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

    // check that the result has the same amount of learning rooms as the AWT
    expect(result.spaces).toHaveLength(mockAWT.world.spaces.length);

    result.spaces?.forEach((space, index) => {
      // check that the results learning rooms have
      // the same amount of learning elements as in the AWT
      // 4: Are the 4 Basic learning elements in the AWT
      expect(space.elements).toHaveLength(1);
    });

    // TODO: add further comparisons between mockAWT and created TOs
    // eg. check that the learning elements have the correct type/metadata
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
