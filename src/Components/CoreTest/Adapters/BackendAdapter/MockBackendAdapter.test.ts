import { mock } from "jest-mock-extended";
import { config } from "../../../../config";
import MockBackendAdapter from "../../../Core/Adapters/BackendAdapter/MockBackendAdapter";
import PlayerDataTO from "../../../Core/Application/DataTransferObjects/PlayerDataTO";
import { XAPiEvent } from "../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import {
  expectedElementTO,
  expectedSpaceTO,
  expectedWorldTO,
} from "./BackendResponses";

const oldConfigValue = config.useFakeBackend;

describe("MockBackendAdapter", () => {
  let systemUnderTest: MockBackendAdapter;

  beforeAll(() => {
    config.useFakeBackend = true;
  });

  beforeEach(() => {
    systemUnderTest = new MockBackendAdapter();
  });

  afterAll(() => {
    config.useFakeBackend = oldConfigValue;
  });

  test("getWorldData returns BackendWorldTO with correct structure", async () => {
    const result = await systemUnderTest.getWorldData({
      userToken: "",
      worldId: 1,
    });

    // check that the result matches the expected structure of LearningWorldTO
    expect(result).toEqual(expect.objectContaining(expectedWorldTO));
    result.spaces?.forEach((space) => {
      expect(space).toEqual(expectedSpaceTO);

      space.elements?.forEach((element) => {
        expect(element).toEqual(expectedElementTO);
      });
    });
  });

  test.todo(
    "add tests for specific desired element types and structure in BackendWorldTO"
  );
  // expect(result.spaces).toHaveLength(4);
  // expect(result.spaces![0].elements).toEqual(
  //   expect.arrayContaining(
  //     Object.keys(ElementTypes).map((elementType) =>
  //       expect.objectContaining({
  //         type: elementType,
  //       })
  //     )
  //   )
  // );

  test("scoreElement resolves", async () => {
    await expect(
      systemUnderTest.scoreElement("token", 42, 1)
    ).resolves.toBeTruthy();
  });

  test("logInUser resolves with a fakeToken", async () => {
    await expect(
      systemUnderTest.loginUser({
        username: "test",
        password: "test",
      })
    ).resolves.toEqual("fakeToken");
  });

  test("should get Courses Available For User", async () => {
    await expect(
      systemUnderTest.getCoursesAvailableForUser("token")
    ).resolves.toEqual({
      courses: [
        {
          courseId: 1,
          courseName: "Testkurs",
        },
      ],
    });
  });

  test("should score H5P Element", async () => {
    const h5pMock = mock<XAPiEvent>();
    await expect(
      systemUnderTest.scoreH5PElement({
        courseId: 1,
        h5pId: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      })
    ).resolves.toEqual(true);
  });

  test.each([[1], [2], [3], [4]])(
    "should get Element Source",
    async (element) => {
      await expect(
        systemUnderTest.getElementSource("token", element)
      ).resolves.toEqual(expect.any(String));
    }
  );

  test("should throw when souce of invalid element is requested", () => {
    async (element) => {
      await expect(systemUnderTest.getElementSource("token", 55)).toThrow();
    };
  });

  test("should get World Status", async () => {
    await expect(systemUnderTest.getWorldStatus("token", 1)).resolves.toEqual({
      courseId: 1,
      learningElements: [
        {
          elementId: 1,
          successss: true,
        },
        {
          elementId: 2,
          successss: false,
        },
        {
          elementId: 3,
          successss: false,
        },
        {
          elementId: 4,
          successss: false,
        },
      ],
    });
  });

  test("should get Element Score", async () => {
    await expect(systemUnderTest.getElementScore("token", 1)).resolves.toEqual({
      elementId: 1,
      successss: true,
    });
  });

  test("should get Player Data", async () => {
    await expect(systemUnderTest.getPlayerData("token")).resolves.toEqual({
      playerGender: "Male",
      playerWorldColor: "Blue",
    });
  });

  test("should update Player Data", async () => {
    await expect(
      systemUnderTest.updatePlayerData("token", {})
    ).resolves.toEqual(new PlayerDataTO());
  });

  test("should throw when try to delete Player Data", async () => {
    await expect(async () =>
      systemUnderTest.deletePlayerData("token")
    ).rejects.toThrow();
  });
});
