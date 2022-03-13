import { MoodleTokenServerResponse } from "./../../../Core/Types/MoodleTokenServerResponse";
import { mock } from "jest-mock-extended";
import IMoodleDataAccess from "../../../Core/DataAccess/Moodle/IMoodleDataAccess";
import MoodleDataAccess from "../../../Core/DataAccess/Moodle/MoodleDataAccess";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";

import axios, { AxiosResponse } from "axios";

const tokenSucessMock = {
  token: "fcc83dae37dad77bda91e3711d51b765",
  privatetoken:
    "dT9xECQECih2NLFrEnCgz5pxcSr39eUjpxF2uQl6OFjYjpRnfrCfeaupFgFDKGYI",
};
jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

const apiRespoonseMock = {
  data: {
    token: "fcc83dae37dad77bda91e3711d51b765",
    privatetoken:
      "dT9xECQECih2NLFrEnCgz5pxcSr39eUjpxF2uQl6OFjYjpRnfrCfeaupFgFDKGYI",
  },
};

describe("MoodleDataAcess", () => {
  let moodleDataAcess: IMoodleDataAccess;

  beforeEach(() => {
    CoreDIContainer.snapshot();
    moodleDataAcess = CoreDIContainer.get<IMoodleDataAccess>(
      CORE_TYPES.IMoodleDataAccess
    );
  });

  afterEach(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("signInUser returns a Token", async () => {
    jest
      .spyOn(MoodleDataAccess.prototype, "makeApiCall")
      .mockResolvedValue(tokenSucessMock);
    expect(
      moodleDataAcess.signInUser("testUser", "testPassword")
    ).resolves.toBe(tokenSucessMock.token);
  });

  test("signInUser throws, if API Call fails", () => {
    jest
      .spyOn(MoodleDataAccess.prototype, "makeApiCall")
      .mockResolvedValue("FalscherWert");
    expect(
      moodleDataAcess.signInUser("testUser", "testPassword")
    ).rejects.toThrow();
  });

  test("MakeApiCall returns the correct values", async () => {
    axiosMock.post.mockResolvedValueOnce(apiRespoonseMock);

    const result = await moodleDataAcess.makeApiCall("testUrl", {
      key1: "value1",
    });

    expect(result).toEqual(apiRespoonseMock.data);
  });
});
