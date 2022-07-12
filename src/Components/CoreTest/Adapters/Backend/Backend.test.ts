import {
  correctFakeLearningElementResponse,
  correctFakeRoomResponse,
  correctFakeWorldResponse,
  mockDSL,
} from "./BackendResponses";
import { config } from "../../../../config";
import Backend from "../../../../Components/Core/Adapters/Backend/Backend";
import axios from "axios";
import { APILearningElementTO } from "../../../Core/Adapters/Backend/APILearningElementTO";
import DSL from "../../../Core/Adapters/Backend/IDSL";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const oldConfigValue = config.useFakeBackend;

describe("Backend", () => {
  beforeAll(() => {
    config.useFakeBackend = true;
  });
  afterAll(() => {
    config.useFakeBackend = oldConfigValue;
  });
  test("should return Learning Elements", async () => {
    const backend = new Backend();
    const learningElements = await backend.getLearningElements({
      userToken: "",
      worldName: "",
    });

    expect(learningElements).toMatchObject(correctFakeLearningElementResponse);
  });

  test("should return Learning Rooms", async () => {
    const backend = new Backend();

    const learningRooms = await backend.getLearningRooms({
      userToken: "",
      worldName: "",
    });
    expect(learningRooms).toStrictEqual(correctFakeRoomResponse);
  });

  test("should return Worlds", async () => {
    const backend = new Backend();

    const worlds = await backend.getWorld({
      userToken: "",
      worldName: "",
    });

    console.log(worlds);

    expect(worlds).toStrictEqual(correctFakeWorldResponse);
  });

  test("Scores a Learning Element", () => {
    const backend = new Backend();
    expect(backend.scoreLearningElement(1)).resolves.not.toThrow();
  });

  test("Loggs user in to Moodle", () => {
    mockedAxios.post.mockResolvedValue({ data: "token" });
    const backend = new Backend();
    const returnedVal = backend.logInUser({
      username: "test",
      password: "test",
    });
    expect(returnedVal).resolves.toBe("token");
  });

  test("Backend calls Axios.Post corectly", async () => {
    config.useFakeBackend = false;
    mockedAxios.post.mockResolvedValue({ data: mockDSL });
    const backend = new Backend();

    await backend.getWorld({
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
