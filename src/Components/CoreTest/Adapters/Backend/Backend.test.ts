import {
  correctFakeLearningElementResponse,
  correctFakeRoomResponse,
  correctFakeWorldResponse,
  mockDSL,
} from "./BackendResponses";
import { config } from "../../../../config";
import Backend from "../../../../Components/Core/Adapters/Backend/Backend";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const oldConfigValue = config.useFakeBackend;

describe("Backend", () => {
  let systemUnderTest: Backend;
  beforeAll(() => {
    config.useFakeBackend = true;
  });
  beforeEach(() => {
    systemUnderTest = new Backend();
  });
  afterAll(() => {
    config.useFakeBackend = oldConfigValue;
  });
  test("should return Learning Elements", async () => {
    const learningElements = await systemUnderTest.getLearningElements({
      userToken: "",
      worldName: "",
    });

    expect(learningElements).toMatchObject(correctFakeLearningElementResponse);
  });

  test("should return Learning Rooms", async () => {
    const learningRooms = await systemUnderTest.getLearningRooms({
      userToken: "",
      worldName: "",
    });
    expect(learningRooms).toStrictEqual(correctFakeRoomResponse);
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
