import {
  expectedLearningElementTO,
  expectedLearningRoomTO,
  expectedLearningWorldTO,
  mockDSL,
} from "./BackendResponses";
import { config } from "../../../../config";
import BackendAdapter from "../../../Core/Adapters/BackendAdapter/BackendAdapter";
import axios from "axios";

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

  test("getLearningWorldData calls backend to get DSL file", async () => {
    const userToken = "testToken";
    const worldName = "testWorld";

    mockedAxios.post.mockResolvedValue({ data: mockDSL });

    await systemUnderTest.getLearningWorldData({
      userToken: userToken,
      worldName: worldName,
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      config.serverURL + "/LearningWorld",
      {
        wsToken: userToken,
        courseName: worldName,
      }
    );
  });

  test("getLearningWorldData converts DSL to TOs", async () => {
    mockedAxios.post.mockResolvedValue({ data: mockDSL });

    const result = await systemUnderTest.getLearningWorldData({
      userToken: "",
      worldName: "",
    });

    // check that the result matches the expected structure of LearningWorldTO
    expect(result).toEqual(expect.objectContaining(expectedLearningWorldTO));
    result.learningRooms?.forEach((learningRoom) => {
      expect(learningRoom).toEqual(expectedLearningRoomTO);

      learningRoom.learningElements?.forEach((learningElement) => {
        expect(learningElement).toEqual(expectedLearningElementTO);
      });
    });

    // check that the result has the same amount of learning rooms as the DSL
    expect(result.learningRooms).toHaveLength(
      mockDSL.learningWorld.learningSpaces.length
    );

    result.learningRooms?.forEach((learningRoom, index) => {
      // check that the results learning rooms have
      // the same amount of learning elements as in the DSL
      expect(learningRoom.learningElements).toHaveLength(
        mockDSL.learningWorld.learningSpaces[index].learningSpaceContent.length
      );
    });

    // TODO: add further comparisons between mockDSL and created TOs
    // eg. check that the learning elements have the correct type/metadata
  });

  test("scoreLearningElement resolves and doesn't throw", () => {
    expect(systemUnderTest.scoreLearningElement(1)).resolves.not.toThrow();
  });

  test("logInUser calls backend and returns a token", () => {
    const token = "token";
    const userName = "userName";
    const password = "password";

    mockedAxios.post.mockResolvedValue({ data: token });
    const returnedVal = systemUnderTest.logInUser({
      username: userName,
      password: password,
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      config.serverURL + "/userlogin",
      {
        username: userName,
        password: password,
      }
    );
    expect(returnedVal).resolves.toBe(token);
  });
});
