import { mock } from "jest-mock-extended";
import { XAPiEvent } from "./../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import {
  expectedElementTO,
  expectedSpaceTO,
  expectedWorldTO,
  mockDSL,
} from "./BackendResponses";
import { config } from "../../../../config";
import BackendAdapter from "../../../Core/Adapters/BackendAdapter/BackendAdapter";
import axios from "axios";
import CourseListTO from "../../../Core/Application/DataTransferObjects/CourseListTO";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const oldConfigValue = config.useFakeBackend;

describe("BackendAdapter", () => {
  let systemUnderTest: BackendAdapter;

  beforeAll(() => {
    config.useFakeBackend = false;
  });

  beforeEach(() => {
    systemUnderTest = new BackendAdapter();
  });

  afterAll(() => {
    config.useFakeBackend = oldConfigValue;
  });

  test("getWorldData calls backend to get DSL file", async () => {
    const userToken = "testToken";
    const worldID = 1337;

    mockedAxios.get.mockResolvedValue({ data: mockDSL });

    await systemUnderTest.getWorldData({
      userToken: userToken,
      worldId: worldID,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL + "/Courses/" + worldID,
      {
        headers: {
          token: userToken,
        },
      }
    );
  });

  test("getWorldData converts DSL to TOs", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockDSL });

    const result = await systemUnderTest.getWorldData({
      userToken: "",
      worldId: 1337,
    });

    // check that the result matches the expected structure of LearningWorldTO
    expect(result).toEqual(expect.objectContaining(expectedWorldTO));
    result.spaces?.forEach((space) => {
      expect(space).toEqual(expectedSpaceTO);

      space.elements?.forEach((element) => {
        expect(element).toEqual(expectedElementTO);
      });
    });

    // check that the result has the same amount of learning rooms as the DSL
    expect(result.spaces).toHaveLength(
      mockDSL.learningWorld.learningSpaces.length
    );

    result.spaces?.forEach((space, index) => {
      // check that the results learning rooms have
      // the same amount of learning elements as in the DSL
      // 4: Are the 4 Basic learning elements in the DSL
      expect(space.elements).toHaveLength(4);
    });

    // TODO: add further comparisons between mockDSL and created TOs
    // eg. check that the learning elements have the correct type/metadata
  });

  test("logInUser calls backend and returns a token", async () => {
    const token = "token";
    const userName = "userName";
    const password = "password";

    mockedAxios.get.mockResolvedValue({
      data: {
        moodleToken: token,
      },
    });
    const returnedVal = await systemUnderTest.logInUser({
      username: userName,
      password: password,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL + "/Users/Login",
      {
        params: {
          UserName: userName,
          Password: password,
        },
      }
    );
    expect(returnedVal).toBe(token);
  });

  test("should score a Learning Element", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        isSuceess: true,
      },
    });
    const returnedVal = await systemUnderTest.scoreElement("token", 1, 1);

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      config.serverURL + "/LearningElements/Course/" + 1 + "/Element/" + 1,
      {},
      {
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toBe(true);
  });

  test("should Get All Avalaibale Courses for a User", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          courses: { courseId: 1, courseName: "string" },
        },
      ],
    });
    const returnedVal = await systemUnderTest.getCoursesAvailableForUser(
      "token"
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL + "/Courses",
      {
        params: {
          limitToEnrolled: false,
        },
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toEqual([
      { courses: { courseId: 1, courseName: "string" } },
    ]);
  });

  test("should score a H5P Element", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        isSuceess: true,
      },
    });
    const h5pMock = mock<XAPiEvent>();
    const returnedVal = await systemUnderTest.scoreH5PElement({
      courseId: 1,
      h5pId: 1,
      userToken: "token",
      rawH5PEvent: h5pMock,
    });

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      config.serverURL + "/LearningElements/Course/" + 1 + "/Element/" + 1,
      {
        serializedXAPIEvent: JSON.stringify(h5pMock),
      },
      {
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toEqual(true);
  });
  test("should get Element Source", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { filePath: "string" },
    });
    const returnedVal = await systemUnderTest.getElementSource("token", 1, 1);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL +
        "/LearningElements/FilePath/Course/" +
        1 +
        "/Element/" +
        1,
      {
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toEqual("string");
  });
  test("should get World Status", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        courseId: 1,
        learningElements: [
          {
            elementId: 1,
            successss: true,
          },
        ],
      },
    });
    const returnedVal = await systemUnderTest.getWorldStatus("token", 1);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL + "/Courses/" + 1 + "/status",
      {
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toEqual({
      courseId: 1,
      learningElements: [
        {
          elementId: 1,
          successss: true,
        },
      ],
    });
  });
  test("should get Element Score", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        elementId: 1,
        successss: true,
      },
    });
    const returnedVal = await systemUnderTest.getElementScore("token", 1, 1);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL +
        "/LearningElements/Course/" +
        1 +
        "/Element/" +
        1 +
        "/Score",
      {
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toEqual({
      elementId: 1,
      successss: true,
    });
  });
  test("should get Player Data", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        playerGender: "string",
        playerWorldColor: "string",
      },
    });
    const returnedVal = await systemUnderTest.getPlayerData("token");

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.serverURL + "/PlayerData",
      {
        headers: {
          token: "token",
        },
      }
    );
    expect(returnedVal).toEqual({
      playerGender: "string",
      playerWorldColor: "string",
    });
  });
  test("should update Player Data", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        playerGender: "string",
        playerWorldColor: "string",
      },
    });
    const returnedVal = await systemUnderTest.updatePlayerData("token", {
      playerGender: "string1",
    });

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);

    expect(returnedVal).toEqual({
      playerGender: "string",
      playerWorldColor: "string",
    });
  });
  test("should delete Player Data", async () => {
    mockedAxios.delete.mockResolvedValue({
      data: true,
    });
    const returnedVal = await systemUnderTest.deletePlayerData("token");

    expect(mockedAxios.delete).toHaveBeenCalledTimes(1);

    expect(returnedVal).toEqual(true);
  });
});
