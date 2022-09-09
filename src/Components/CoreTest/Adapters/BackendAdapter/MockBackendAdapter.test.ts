import { config } from "../../../../config";
import MockBackendAdapter from "../../../Core/Adapters/BackendAdapter/MockBackendAdapter";
import { LearningElementTypes } from "../../../Core/Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import {
  expectedLearningElementTO,
  expectedLearningRoomTO,
  expectedLearningWorldTO,
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

  test("getLearningWorldData returns LearningWorldTO with one room and every element type", async () => {
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

    // check that the result has only one learning room
    expect(result.learningRooms).toHaveLength(1);

    // check that the results first room includes every learning element type
    expect(result.learningRooms![0].learningElements).toEqual(
      expect.arrayContaining(
        Object.keys(LearningElementTypes).map((learningElementType) =>
          expect.objectContaining({
            learningElementData: expect.objectContaining({
              type: learningElementType,
            }),
          })
        )
      )
    );
  });

  test("scoreLearningElement resolves", async () => {
    await expect(
      systemUnderTest.scoreLearningElement(42)
    ).resolves.toBeUndefined();
  });

  test("logInUser resolves with a fakeToken", async () => {
    await expect(
      systemUnderTest.logInUser({
        username: "test",
        password: "test",
      })
    ).resolves.toEqual("fakeToken");
  });
});
