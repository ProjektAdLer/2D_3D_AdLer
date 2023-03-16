import { mock } from "jest-mock-extended";
import { config } from "../../../../config";
import MockBackendAdapter from "../../../Core/Adapters/BackendAdapter/MockBackendAdapter";
import PlayerDataTO from "../../../Core/Application/DataTransferObjects/PlayerDataTO";
import { XAPiEvent } from "../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElementUseCase";
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
      worldID: 1,
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
          courseID: 1,
          courseName: "Small World",
        },
        {
          courseID: 2,
          courseName: "Big World",
        },
      ],
    });
  });

  test("should score H5P Element", async () => {
    const h5pMock = mock<XAPiEvent>();
    await expect(
      systemUnderTest.scoreH5PElement({
        courseID: 1,
        h5pID: 1,
        userToken: "token",
        rawH5PEvent: h5pMock,
      })
    ).resolves.toEqual(true);
  });

  test.each([[1], [2], [3], [4]])(
    "should get Element Source",
    async (element) => {
      await expect(
        systemUnderTest.getElementSource("token", element, 1)
      ).resolves.toEqual(expect.any(String));
    }
  );

  test("should throw when souce of invalid element is requested", () => {
    async (element) => {
      await expect(systemUnderTest.getElementSource("token", 55, 1)).toThrow();
    };
  });

  test("should get World Status", async () => {
    await expect(systemUnderTest.getWorldStatus("token", 1)).resolves.toEqual({
      worldId: 1,
      elements: [
        {
          elementId: 1,
          success: true,
        },
        {
          elementId: 2,
          success: true,
        },
        {
          elementId: 3,
          success: false,
        },
        {
          elementId: 4,
          success: false,
        },
        {
          elementId: 5,
          success: false,
        },
      ],
    });
  });

  test("should get Element Score", async () => {
    await expect(systemUnderTest.getElementScore("token", 1)).resolves.toEqual({
      elementID: 1,
      success: true,
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
