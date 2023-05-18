import { mock } from "jest-mock-extended";
import { config } from "../../../../config";
import MockBackendAdapter from "../../../Core/Adapters/BackendAdapter/MockBackendAdapter";
import PlayerDataTO from "../../../Core/Application/DataTransferObjects/PlayerDataTO";
import LearningWorldStatusTO from "../../../Core/Application/DataTransferObjects/LearningWorldStatusTO";
import { XAPIEvent } from "../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
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
        expect(element).toBeNullOrEqual(expectedElementTO);
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
    const h5pMock = mock<XAPIEvent>();
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
    async (elementID) => {
      await expect(
        systemUnderTest.getElementSource({
          userToken: "token",
          worldID: 1,
          elementID: elementID,
        })
      ).resolves.toEqual(expect.any(String));
    }
  );

  test("should throw when souce of invalid element is requested", () => {
    async (element) => {
      await expect(
        systemUnderTest.getElementSource({
          userToken: "token",
          elementID: 55,
          worldID: 1,
        })
      ).toThrow();
    };
  });

  test("should get World Status", async () => {
    await expect(systemUnderTest.getWorldStatus("token", 1)).resolves.toEqual({
      worldID: 1,
      elements: [
        {
          elementID: 1,
          hasScored: true,
        },
        {
          elementID: 2,
          hasScored: true,
        },
        {
          elementID: 3,
          hasScored: false,
        },
        {
          elementID: 4,
          hasScored: false,
        },
        {
          elementID: 5,
          hasScored: false,
        },
      ],
    } as LearningWorldStatusTO);
  });

  test("should get Element Score", async () => {
    await expect(
      systemUnderTest.getElementScore({
        userToken: "token",
        elementID: 1,
        worldID: 1,
      })
    ).resolves.toEqual({
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

  test("should resolve with true when trying to delete Player Data", async () => {
    await expect(systemUnderTest.deletePlayerData("token")).resolves.toEqual(
      true
    );
  });
});
