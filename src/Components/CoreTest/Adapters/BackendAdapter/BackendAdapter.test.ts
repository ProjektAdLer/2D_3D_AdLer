import { AdaptivityElementDataTO } from "./../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import { mock } from "jest-mock-extended";
import {
  expectedElementTO,
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

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const oldConfigBackendValue = config.useFakeBackend;
const oldConfigServerURL = config.serverURL;

describe("BackendAdapter", () => {
  let systemUnderTest: BackendAdapter;

  beforeAll(() => {
    config.useFakeBackend = false;
    config.serverURL = "http://localhost:1337";
  });

  beforeEach(() => {
    systemUnderTest = new BackendAdapter();
  });

  afterAll(() => {
    config.useFakeBackend = oldConfigBackendValue;
    config.serverURL = oldConfigServerURL;
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
        if (element?.adaptivity === undefined) {
          expect(element).toBeNullOrEqual(expectedElementTO);
        } else {
          expect(element.adaptivity).toEqual(
            expect.any(AdaptivityElementDataTO)
          );
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

    mockedAxios.get.mockResolvedValue({
      data: {
        lmsToken: token,
      },
    });
    const returnedVal = await systemUnderTest.loginUser({
      username: userName,
      password: password,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("/Users/Login", {
      params: {
        UserName: userName,
        Password: password,
      },
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
      }
    );
    expect(returnedVal).toBe(true);
  });

  test("should get all available courses for a user", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        worlds: [{ worldId: 1, worldName: "string" }],
      },
    } as AxiosResponse<CoursesAvailableForUserResponse>);
    const returnedVal = await systemUnderTest.getCoursesAvailableForUser(
      "token"
    );

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
      }
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
      }
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
      }
    );
    expect(returnedVal).toEqual({
      elementID: 1,
      success: true,
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
    expect(mockedAxios.get).toHaveBeenCalledWith("/PlayerData", {
      headers: {
        token: "token",
      },
    });
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
