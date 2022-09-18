import { config } from "../../../../config";
import MockBackendAdapter from "../../../Core/Adapters/BackendAdapter/MockBackendAdapter";
import { ElementTypes } from "../../../Core/Presentation/Babylon/Elements/Types/ElementTypes";
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

  test("getWorldData returns WorldTO with one space and every element type", async () => {
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

    // check that the result has only one learning room
    expect(result.spaces).toHaveLength(1);

    // check that the results first room includes every learning element type
    expect(result.spaces![0].elements).toEqual(
      expect.arrayContaining(
        Object.keys(ElementTypes).map((elementType) =>
          expect.objectContaining({
            elementData: expect.objectContaining({
              type: elementType,
            }),
          })
        )
      )
    );
  });

  test("scoreElement resolves", async () => {
    await expect(systemUnderTest.scoreElement(42)).resolves.toBeUndefined();
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
