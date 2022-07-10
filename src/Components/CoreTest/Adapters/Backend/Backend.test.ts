import { config } from "../../../../config";
import Backend from "../../../../Components/Core/Adapters/Backend/Backend";
import axios from "axios";
import { APILearningElementTO } from "../../../Core/Adapters/Backend/APILearningElementTO";

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
});

const correctFakeLearningElementResponse = [
  {
    id: 1,
    name: "Metriken Einstiegsvideo",
    elementType: "h5p",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Metriken Teil 1",
      },
    ],
  },
  {
    id: 2,
    name: "Metriken Schiebespiel",
    elementType: "h5p",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Schiebespiel Metriken",
      },
    ],
  },
  {
    id: 3,
    name: "Metriken Wortsuche",
    elementType: "h5p",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Wortsuche Metriken",
      },
    ],
  },
];

const correctFakeRoomResponse = [
  { id: 1, name: "Lernraum Metriken", learningElementIds: [1, 2, 3] },
];

const correctFakeWorldResponse = {
  name: "Lernwelt Metriken",
  learningRoomIds: [1],
};
