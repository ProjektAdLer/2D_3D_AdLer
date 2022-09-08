import {
  correctFakeLearningElementResponse,
  correctFakeRoomResponse,
  correctFakeWorldResponse,
  mockDSL,
} from "./BackendResponses";
import { config } from "../../../../config";
import BackendAdapter from "../../../Core/Adapters/BackendAdapter/BackendAdapter";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const oldConfigValue = config.useFakeBackend;

describe("Backend", () => {
  let systemUnderTest: BackendAdapter;
  beforeAll(() => {
    config.useFakeBackend = true;
  });
  beforeEach(() => {
    systemUnderTest = new BackendAdapter();
  });
  afterAll(() => {
    config.useFakeBackend = oldConfigValue;
  });

  test("should return Worlds", async () => {
    const worlds = await systemUnderTest.getLearningWorldData({
      userToken: "",
      worldName: "",
    });

    expect(worlds).toStrictEqual(correctFakeWorldResponse);
  });

  test("Scores a Learning Element", () => {
    expect(systemUnderTest.scoreLearningElement(1)).resolves.not.toThrow();
  });

  test("Loggs user in to Moodle with fake backend", () => {
    const returnedVal = systemUnderTest.logInUser({
      username: "test",
      password: "test",
    });
    expect(returnedVal).resolves.toBe("fakeToken");
  });

  test("Loggs user in to Moodle", () => {
    config.useFakeBackend = false;
    mockedAxios.post.mockResolvedValue({ data: "token" });
    const returnedVal = systemUnderTest.logInUser({
      username: "test",
      password: "test",
    });
    config.useFakeBackend = true;
    expect(returnedVal).resolves.toBe("token");
  });

  test("Backend calls Axios.Post corectly", async () => {
    config.useFakeBackend = false;
    mockedAxios.post.mockResolvedValue({ data: mockDSL });

    await systemUnderTest.getLearningWorldData({
      userToken: "Test_Token",
      worldName: "Test_Welt",
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      config.serverURL + "/LearningWorld",
      {
        wsToken: "Test_Token",
        courseName: "Test_Welt",
      }
    );
    config.useFakeBackend = true;
  });
});
