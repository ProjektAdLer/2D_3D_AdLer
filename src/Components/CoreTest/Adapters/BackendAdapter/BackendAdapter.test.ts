import {
  expectedElementTO,
  expectedSpaceTO,
  expectedWorldTO,
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

  test("getWorldData calls backend to get DSL file", async () => {
    const userToken = "testToken";
    const worldName = "testWorld";

    mockedAxios.post.mockResolvedValue({ data: mockDSL });

    await systemUnderTest.getWorldData({
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

  test("getWorldData converts DSL to TOs", async () => {
    mockedAxios.post.mockResolvedValue({ data: mockDSL });

    const result = await systemUnderTest.getWorldData({
      userToken: "",
      worldName: "",
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
    expect(result.spaces).toHaveLength(mockDSL.world.spaces.length);

    result.spaces?.forEach((space, index) => {
      // check that the results learning rooms have
      // the same amount of learning elements as in the DSL
      expect(space.elements).toHaveLength(
        mockDSL.world.spaces[index].spaceContent.length
      );
    });

    // TODO: add further comparisons between mockDSL and created TOs
    // eg. check that the learning elements have the correct type/metadata
  });

  test("scoreElement resolves and doesn't throw", () => {
    expect(systemUnderTest.scoreElement(1)).resolves.not.toThrow();
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
